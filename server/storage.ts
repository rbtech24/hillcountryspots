import type { 
  Destination, 
  Activity, 
  Event, 
  BlogPost,
  InsertDestination,
  InsertActivity, 
  InsertEvent,
  InsertBlogPost 
} from "@shared/schema";

export interface IStorage {
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Activities
  getActivities(): Promise<Activity[]>;
  getActivitiesByCategory(category: string): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Events
  getEvents(): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private destinations: Map<number, Destination>;
  private activities: Map<number, Activity>;
  private events: Map<number, Event>;
  private blogPosts: Map<number, BlogPost>;
  private currentDestinationId: number;
  private currentActivityId: number;
  private currentEventId: number;
  private currentBlogPostId: number;

  constructor() {
    this.destinations = new Map();
    this.activities = new Map();
    this.events = new Map();
    this.blogPosts = new Map();
    this.currentDestinationId = 1;
    this.currentActivityId = 1;
    this.currentEventId = 1;
    this.currentBlogPostId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Clear existing data
    this.blogPosts.clear();
    this.currentBlogPostId = 1;
    
    // Add sample destinations first
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Fredericksburg",
        description: "Historic German town famous for wineries, peach orchards, and authentic German cuisine.",
        imageUrl: "/attached_assets/fredericksburg (2).png",
        rating: 48,
        tags: ["Historic", "Wine", "German Culture"],
        featured: true,
      },
      {
        name: "Austin",
        description: "Keep Austin Weird - vibrant music scene, food trucks, and outdoor adventures in the Hill Country gateway.",
        imageUrl: "/attached_assets/austin.png",
        rating: 49,
        tags: ["Music", "Food", "Nightlife"],
        featured: true,
      },
      {
        name: "Wimberley",
        description: "Artisan village with unique shops, galleries, and the famous Wimberley Market Days.",
        imageUrl: "/attached_assets/Wimberly Texas.png",
        rating: 46,
        tags: ["Arts", "Shopping"],
        featured: true,
      },
    ];
    
    for (const destination of sampleDestinations) {
      await this.createDestination(destination);
    }
    
    // Add sample activities
    const sampleActivities: InsertActivity[] = [
      {
        name: "Wine Tasting Tours",
        description: "Explore world-class wineries along the Texas Wine Trail with guided tastings and vineyard tours.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "4-6 hours",
        price: "$45-85",
        icon: "wine-glass",
      },
      {
        name: "River Tubing",
        description: "Float down the Guadalupe or San Marcos Rivers for the ultimate Texas summer experience.",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-4 hours",
        price: "$25-45",
        icon: "water",
      },
      
      // Outdoor Adventures & Nature
      {
        name: "Enchanted Rock Climbing",
        description: "Climb the iconic pink granite dome for panoramic views and world-class rock climbing.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "3-5 hours",
        price: "$7",
        icon: "landmark",
      },
      {
        name: "Hamilton Pool Preserve",
        description: "Swim in a picturesque natural pool in a canyon with a 50-ft waterfall.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-3 hours",
        price: "$15",
        icon: "water",
      },
      {
        name: "Jacob's Well Natural Area",
        description: "Experience the crystal-clear artesian spring and iconic swimming hole in Wimberley.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-4 hours",
        price: "$9-15",
        icon: "water",
      },
      {
        name: "Lost Maples Fall Foliage",
        description: "Witness stunning fall colors from Uvalde bigtooth maple trees in early November.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half day",
        price: "$7",
        icon: "hiking",
      },
      {
        name: "Pedernales Falls State Park",
        description: "Hike along stepped pools and explore backcountry trails with river access.",
        imageUrl: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half day",
        price: "$7",
        icon: "hiking",
      },
      
      // Unique Experiences
      {
        name: "Bat Watching at Old Tunnel",
        description: "Observe 2-3 million bats emerge at dusk from May to October.",
        imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$5",
        icon: "star",
      },
      {
        name: "Congress Avenue Bridge Bats",
        description: "Watch millions of bats emerge at sunset over Lady Bird Lake in Austin.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "Free",
        icon: "star",
      },
      {
        name: "Cave Without a Name",
        description: "Explore stunning underground formations at this National Natural Landmark in Boerne.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1 hour",
        price: "$20-24",
        icon: "landmark",
      },
      {
        name: "Wimberley Zipline Adventures",
        description: "Soar through the treetops with scenic views and high-flying fun.",
        imageUrl: "https://images.unsplash.com/photo-1517654695151-6d2e5dc48ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "2-3 hours",
        price: "$49-89",
        icon: "star",
      },
      
      // Historical & Cultural Sites
      {
        name: "National Museum of the Pacific War",
        description: "Comprehensive museum honoring Pacific War stories in Admiral Nimitz's hometown.",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-4 hours",
        price: "$15-20",
        icon: "landmark",
      },
      {
        name: "LBJ National Historical Park",
        description: "Explore President Johnson's boyhood home and the 'Texas White House' ranch.",
        imageUrl: "https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "Half day",
        price: "Free-$3",
        icon: "landmark",
      },
      {
        name: "Gruene Hall Live Music",
        description: "Experience Texas's oldest dance hall with authentic country music and dancing.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-4 hours",
        price: "$15-45",
        icon: "star",
      },
      
      // Wine & Culinary Experiences
      {
        name: "Wine Road 290 Tour",
        description: "Explore over 50 wineries along the famous corridor through Texas Wine Country.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "Full day",
        price: "$25-75 per tasting",
        icon: "wine-glass",
      },
      {
        name: "The Salt Lick BBQ Experience",
        description: "Visit the legendary cash-only BBQ joint that's a true Texas institution.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-25",
        icon: "fire",
      },
      {
        name: "Fredericksburg Herb Farm Spa",
        description: "Enjoy a serene spa and garden experience with farm-to-table treatments.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-4 hours",
        price: "$75-200",
        icon: "star",
      },
      
      // Family Activities
      {
        name: "Schlitterbahn Waterpark",
        description: "Thrilling water slides and leisurely rivers at this famous New Braunfels attraction.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "Full day",
        price: "$45-65",
        icon: "water",
      },
      {
        name: "Hill Country Science Mill",
        description: "Interactive science museum in a renovated historic mill, perfect for families.",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-3 hours",
        price: "$12-15",
        icon: "star",
      },
      {
        name: "Dude Ranch Experience",
        description: "Authentic cowboy culture with horseback riding and ranch activities in Bandera.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half day to overnight",
        price: "$75-300",
        icon: "star",
      },
      {
        name: "Wildseed Farms",
        description: "Visit the largest working wildflower farm in the U.S. with seasonal blooms.",
        imageUrl: "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "1-2 hours",
        price: "Free",
        icon: "hiking",
      },
      
      // More Outdoor Adventures
      {
        name: "Colorado Bend State Park",
        description: "Hike to the beautiful moss-covered Gorman Falls and explore pristine wilderness.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half day",
        price: "$7",
        icon: "hiking",
      },
      {
        name: "Inks Lake State Park",
        description: "Nine miles of beautiful hiking trails with swimming opportunities in clear waters.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half day",
        price: "$7",
        icon: "hiking",
      },
      {
        name: "Hill Country State Natural Area",
        description: "Premier horseback riding location with over 40 miles of trails in Bandera.",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half to full day",
        price: "$7",
        icon: "star",
      },
      {
        name: "Willow City Loop Drive",
        description: "Scenic 13-mile drive especially beautiful during wildflower season with rolling hills.",
        imageUrl: "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "1-2 hours",
        price: "Free",
        icon: "hiking",
      },
      {
        name: "Cypress Valley Canopy Tours",
        description: "Treetop ziplines and canopy tours through ancient cypress trees.",
        imageUrl: "https://images.unsplash.com/photo-1517654695151-6d2e5dc48ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "2-3 hours",
        price: "$65-95",
        icon: "star",
      },
      {
        name: "Lake Travis Zipline Adventures",
        description: "Multi-level zipline course with stunning lake views and adventure challenges.",
        imageUrl: "https://images.unsplash.com/photo-1517654695151-6d2e5dc48ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "2-4 hours",
        price: "$49-89",
        icon: "star",
      },
      {
        name: "Garner State Park",
        description: "Enjoy the spring-fed Frio River for swimming, tubing, and camping in scenic surroundings.",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "Half to full day",
        price: "$7",
        icon: "hiking",
      },
      {
        name: "Stargazing Tours",
        description: "Experience dark skies perfect for astronomy with less light pollution than major cities.",
        imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "2-3 hours",
        price: "$25-45",
        icon: "star",
      },
      
      // More Water Activities
      {
        name: "Comal River Tubing",
        description: "Float the crystal-clear, spring-fed Comal River - consistently cool and refreshing.",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-4 hours",
        price: "$25-35",
        icon: "water",
      },
      {
        name: "Krause Springs",
        description: "Natural spring swimming hole with waterfall and beautiful cypress trees.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "Half day",
        price: "$8-12",
        icon: "water",
      },
      {
        name: "Canyon Lake",
        description: "Perfect for boating, swimming, and scenic lake views with multiple access points.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "Half to full day",
        price: "$5-15",
        icon: "water",
      },
      {
        name: "Barton Springs Pool",
        description: "Three-acre spring-fed swimming pool in Zilker Park with constant 68-70°F temperature.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-4 hours",
        price: "$5-9",
        icon: "water",
      },
      {
        name: "San Marcos River Glass Bottom Boat Tours",
        description: "Crystal-clear river tours showcasing underwater springs and aquatic life.",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "1 hour",
        price: "$12-18",
        icon: "water",
      },
      {
        name: "Medina River Recreation",
        description: "Less crowded alternative for tubing and kayaking with beautiful natural surroundings.",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-4 hours",
        price: "$20-30",
        icon: "water",
      },
      {
        name: "Blue Hole Regional Park",
        description: "Wimberley's iconic swimming hole with rope swings and natural beauty.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Water Activities",
        duration: "2-3 hours",
        price: "$3-5",
        icon: "water",
      },
      
      // More Wine & Dining
      {
        name: "Becker Vineyards",
        description: "Award-winning winery in Stonewall featured in national publications for exceptional wines.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-25",
        icon: "wine-glass",
      },
      {
        name: "William Chris Vineyards",
        description: "Hye winery known for 100% Texas wines with beautiful vineyard views.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-20",
        icon: "wine-glass",
      },
      {
        name: "Duchman Family Winery",
        description: "Italian varietals in beautiful Driftwood setting with exceptional food pairings.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-25",
        icon: "wine-glass",
      },
      {
        name: "Fall Creek Vineyards",
        description: "One of Texas's oldest and most respected wineries with lake views.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-20",
        icon: "wine-glass",
      },
      {
        name: "Fredericksburg Brewing Company",
        description: "Texas's oldest brewpub featuring German-style lagers and authentic German food.",
        imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$8-15",
        icon: "wine-glass",
      },
      {
        name: "Altstadt Brewery",
        description: "Authentic Bavarian brewery in Fredericksburg with traditional German beers.",
        imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$6-12",
        icon: "wine-glass",
      },
      {
        name: "Das Peach Haus",
        description: "Farm-to-table peach products and treats in historic brewery setting with beautiful grounds.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1 hour",
        price: "$5-15",
        icon: "fire",
      },
      {
        name: "The Gristmill Restaurant",
        description: "Classic riverside dining with fantastic Guadalupe River views and Texas cuisine.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-30",
        icon: "fire",
      },
      {
        name: "The Leaning Pear",
        description: "Highly-regarded farm-to-table restaurant in Wimberley offering sophisticated Hill Country dining.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$20-40",
        icon: "fire",
      },
      {
        name: "Dripping Springs Distillery Tours",
        description: "Tour multiple craft distilleries in the 'Gateway to Hill Country' for unique local spirits.",
        imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "2-4 hours",
        price: "$25-45",
        icon: "wine-glass",
      },
      {
        name: "Grape Creek Vineyards",
        description: "Family-owned winery specializing in Italian varietals with beautiful architecture.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-20",
        icon: "wine-glass",
      },
      {
        name: "Kuhlman Cellars",
        description: "Sustainable winery with solar power and innovative eco-friendly practices.",
        imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "1-2 hours",
        price: "$15-25",
        icon: "wine-glass",
      },
      
      // More Culture Activities
      {
        name: "Longhorn Cavern State Park",
        description: "Unique river-formed cave with smooth chambers, historically used by Native Americans and outlaws.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$16-20",
        icon: "landmark",
      },
      {
        name: "Cascade Caverns",
        description: "Underground formations and cave tours in Boerne with stunning natural chambers.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1 hour",
        price: "$18-22",
        icon: "landmark",
      },
      {
        name: "Natural Bridge Caverns",
        description: "Spectacular underground formations accessed through a 60-foot natural limestone bridge.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1 hour",
        price: "$19-24",
        icon: "landmark",
      },
      {
        name: "Pioneer Museum Complex",
        description: "Learn about German immigrant history through original buildings and artifacts in Fredericksburg.",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$10-15",
        icon: "landmark",
      },
      {
        name: "Comfort Historic District",
        description: "Explore nearly 100 buildings built before 1910 showcasing historic German architecture.",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "Free",
        icon: "landmark",
      },
      {
        name: "McKenna Children's Museum",
        description: "Interactive exhibits designed for younger children in New Braunfels.",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-3 hours",
        price: "$8-12",
        icon: "star",
      },
      {
        name: "Bandera Natural History Museum",
        description: "Focuses on natural environment and cowboy history of the Hill Country region.",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$5-8",
        icon: "landmark",
      },
      {
        name: "Fort Martin Scott",
        description: "Explore Texas's first frontier fort and learn about early military history.",
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1 hour",
        price: "$3-5",
        icon: "landmark",
      },
      {
        name: "Luckenbach General Store",
        description: "Visit the tiny, laid-back town made famous by country musicians for authentic Texas charm.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "Free",
        icon: "star",
      },
      {
        name: "11th Street Cowboy Bar",
        description: "Authentic cowboy culture with live music in Bandera, the Cowboy Capital of the World.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-4 hours",
        price: "$5-15",
        icon: "star",
      },
      {
        name: "Arkey Blue's Silver Dollar Saloon",
        description: "Legendary honky-tonk in Bandera featuring authentic Texas country music and dancing.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-4 hours",
        price: "$5-10",
        icon: "star",
      },
      {
        name: "Wimberley Glassblowing Studios",
        description: "Watch artisan demonstrations and try glassblowing in the artistic community of Wimberley.",
        imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$25-75",
        icon: "star",
      },
      {
        name: "EmilyAnn Theatre & Gardens",
        description: "Beautiful performance space with gardens hosting events like the Annual Butterfly Festival.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-3 hours",
        price: "$15-35",
        icon: "star",
      },
      {
        name: "Wimberley Market Days",
        description: "One of the largest outdoor markets in Hill Country with hundreds of vendors (first Saturday monthly).",
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "Half day",
        price: "Free",
        icon: "star",
      },
      {
        name: "Cibolo Nature Center",
        description: "Educational programs, farmers market, and beautiful wetlands, prairies, and woodlands.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-3 hours",
        price: "Free-$5",
        icon: "hiking",
      },
      {
        name: "Boerne Market Days",
        description: "Local artisan market featuring Hill Country crafts, food, and community spirit.",
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "2-3 hours",
        price: "Free",
        icon: "star",
      },
    ];
    
    for (const activity of sampleActivities) {
      await this.createActivity(activity);
    }
    
    // Add comprehensive Hill Country events for 2025
    const sampleEvents: InsertEvent[] = [
      // June 2025
      {
        name: "Kerrville Folk Festival",
        description: "America's longest-running music festival celebrating folk, country, and Americana music with camping and workshops.",
        date: "May 22 - June 8, 2025",
        location: "Kerrville",
        price: "$45-85",
        featured: true,
      },
      {
        name: "Blanco Lavender Festival",
        description: "Celebrates the lavender harvest with vendors, food, music, and lavender farm tours.",
        date: "June 6-8, 2025",
        location: "Blanco",
        price: "$12",
        featured: false,
      },
      {
        name: "Stonewall Peach JAMboree & Rodeo",
        description: "Celebrates the peach harvest with rodeo, music, and peach dishes in the heart of peach country.",
        date: "June 19-21, 2025",
        location: "Stonewall",
        price: "$15-25",
        featured: true,
      },
      {
        name: "Watermelon Thump",
        description: "Iconic festival celebrating watermelons with contests, music, and food.",
        date: "June 26-29, 2025",
        location: "Luling",
        price: "$10",
        featured: false,
      },
      
      // July 2025
      {
        name: "Austin Symphony July 4th Concert & Fireworks",
        description: "Patriotic concert and large fireworks display over Lady Bird Lake with the Austin Symphony.",
        date: "July 4, 2025",
        location: "Austin",
        price: "Free",
        featured: true,
      },
      {
        name: "Kerrville's 4th on the River Festival",
        description: "Free concert and fireworks celebration along the Guadalupe River.",
        date: "July 4, 2025",
        location: "Kerrville",
        price: "Free",
        featured: false,
      },
      {
        name: "Gillespie County Fair & Race Meet",
        description: "Traditional county fair with horse racing, rodeo, live music, and carnival attractions.",
        date: "August 15-25, 2025",
        location: "Fredericksburg",
        price: "$8-15",
        featured: true,
      },
      
      // Fall Events
      {
        name: "Austin City Limits Music Festival",
        description: "One of the nation's premier music festivals featuring top artists across multiple genres at Zilker Park.",
        date: "October 3-5 & October 10-12, 2025",
        location: "Austin",
        price: "$275-450",
        featured: true,
      },
      {
        name: "Fredericksburg Oktoberfest",
        description: "Celebrate German heritage with traditional music, authentic cuisine, craft beer, and family activities.",
        date: "October 4-5, 2025",
        location: "Fredericksburg",
        price: "$12",
        featured: true,
      },
      {
        name: "Formula 1 United States Grand Prix",
        description: "High-speed racing and major concerts at Circuit of The Americas with world-class entertainment.",
        date: "October 17-19, 2025",
        location: "Austin",
        price: "$89-750",
        featured: true,
      },
      {
        name: "Wurstfest",
        description: "A Ten Day Salute To Sausage - massive German festival with food, beer, music, and carnival.",
        date: "October 31 - November 9, 2025",
        location: "New Braunfels",
        price: "$12-15",
        featured: true,
      },
      
      // November-December 2025
      {
        name: "Texas Monthly BBQ Fest",
        description: "Celebrates the state's best BBQ with live music and demonstrations in the BBQ Capital of Texas.",
        date: "November 1-2, 2025",
        location: "Lockhart",
        price: "$35-65",
        featured: false,
      },
      {
        name: "Lights Spectacular",
        description: "Twinkle Town transforms Johnson City into a dazzling holiday light display.",
        date: "November 15, 2025 - January 1, 2026",
        location: "Johnson City",
        price: "Free",
        featured: true,
      },
      {
        name: "Christmas Wine Affair Passport",
        description: "Special passport for holiday tastings at Texas Hill Country wineries.",
        date: "November 29 - December 15, 2025",
        location: "Hill Country Wineries",
        price: "$35-55",
        featured: false,
      },
      {
        name: "Festival of Texas Fiddling",
        description: "Celebrates Texas fiddling tradition at the historic Twin Sisters Dance Hall.",
        date: "December 5-7, 2025",
        location: "Blanco",
        price: "$15-25",
        featured: false,
      },
      {
        name: "Fredericksburg Christmas Nights of Lights",
        description: "German-Texas holiday celebrations with light show and festive events throughout the town.",
        date: "November 29, 2025 - January 4, 2026",
        location: "Fredericksburg",
        price: "Free-$8",
        featured: true,
      },
      
      // Additional June Events
      {
        name: "ATX Television Festival",
        description: "Showcasing the past, present, and future of TV with panels, screenings, and Q&As.",
        date: "May 29 - June 1, 2025",
        location: "Austin",
        price: "$45-125",
        featured: false,
      },
      {
        name: "Central Texas Juneteenth Celebration",
        description: "Annual parade and celebration in East Austin commemorating freedom.",
        date: "June 19, 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Fredericksburg Trade Days",
        description: "Large outdoor market with antiques, crafts, and unique finds.",
        date: "June 20-22, 2025",
        location: "Fredericksburg",
        price: "Free",
        featured: false,
      },
      {
        name: "Austin African American Book Festival",
        description: "Free literary event with authors and speakers celebrating African American literature.",
        date: "June 29, 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      
      // Additional July Events
      {
        name: "Hill Country Galleria Independence Day",
        description: "Fireworks, music, and family activities celebrating Independence Day.",
        date: "July 4, 2025",
        location: "Bee Cave",
        price: "Free",
        featured: false,
      },
      {
        name: "Galleywinter River Jam",
        description: "Music festival along the beautiful Guadalupe River.",
        date: "July 11-13, 2025",
        location: "New Braunfels",
        price: "$25-45",
        featured: false,
      },
      {
        name: "Classic Game Fest",
        description: "Largest retro video game convention in Texas with classic gaming.",
        date: "July 25-27, 2025",
        location: "Austin",
        price: "$15-35",
        featured: false,
      },
      
      // Additional August-September Events
      {
        name: "Central Texas State Fair",
        description: "Traditional county fair with rodeo, carnival, and exhibits.",
        date: "August 28-31, 2025",
        location: "Belton",
        price: "$8-12",
        featured: false,
      },
      {
        name: "Big Ta' Do Chili Cook-Off",
        description: "Annual chili cook-off and car/bike show in the heart of Hill Country.",
        date: "September 13, 2025",
        location: "Kerrville",
        price: "$10",
        featured: false,
      },
      {
        name: "Uhland Fall Fest",
        description: "Community fall festival celebrating the changing season.",
        date: "September 27-28, 2025",
        location: "Uhland",
        price: "$5",
        featured: false,
      },
      
      // Additional October Events
      {
        name: "Austin String Band Festival",
        description: "Festival celebrating traditional string band music in scenic Driftwood.",
        date: "October 17-19, 2025",
        location: "Driftwood",
        price: "$15-25",
        featured: false,
      },
      {
        name: "Viva la Vida Fest",
        description: "Austin's largest and longest-running Day of the Dead festival.",
        date: "October 31, 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Texas State Arts & Crafts Fair",
        description: "Juried art and craft fair showcasing the best Texas artists.",
        date: "October 25-26, 2025",
        location: "Ingram",
        price: "$8",
        featured: false,
      },
      
      // Additional November Events  
      {
        name: "Gruene Market Days",
        description: "Monthly artisan market featuring nearly 100 vendors and live entertainment.",
        date: "November 15-16, 2025",
        location: "Gruene",
        price: "Free",
        featured: false,
      },
      {
        name: "Walkway of Lights",
        description: "Thousands of lights decorating the beautiful lakeside park.",
        date: "November 15, 2025 - January 1, 2026",
        location: "Marble Falls",
        price: "Free",
        featured: false,
      },
      {
        name: "Holidays in Gruene",
        description: "Special holiday events, carols, Cowboy Kringle, and Jingle Bell Run.",
        date: "November 29 - December 31, 2025",
        location: "Gruene",
        price: "Free-$10",
        featured: false,
      },
      
      // Additional December Events
      {
        name: "Christmas in Comfort",
        description: "Holiday light park featuring the historic Crumbling Castle.",
        date: "December 1-31, 2025",
        location: "Comfort",
        price: "$12-18",
        featured: false,
      },
      {
        name: "Eisbahn Outdoor Ice Skating",
        description: "Outdoor ice skating rink in historic Marktplatz.",
        date: "December 1-31, 2025",
        location: "Fredericksburg",
        price: "$12-15",
        featured: false,
      },
      {
        name: "Sights & Sounds of Christmas",
        description: "Winter wonderland with ice skating, carnival rides, and holiday entertainment.",
        date: "December 1-31, 2025",
        location: "San Marcos",
        price: "$8-15",
        featured: false,
      },
      {
        name: "Christmas Stroll",
        description: "Annual Christmas celebration with parade and holiday shopping.",
        date: "December 4-7, 2025",
        location: "Salado",
        price: "Free",
        featured: false,
      },
      {
        name: "Christmas Bazaar",
        description: "Holiday shopping, Santa photos, and live music at the legendary venue.",
        date: "December 7, 2025",
        location: "Luckenbach",
        price: "Free",
        featured: false,
      },
      {
        name: "Christmas on Mercer Street",
        description: "Holiday market, family activities, and tree lighting ceremony.",
        date: "December 7, 2025",
        location: "Dripping Springs",
        price: "Free",
        featured: false,
      },
      {
        name: "Wimberley Trail of Lights",
        description: "Extensive light display with scenic walking trails through the countryside.",
        date: "November 29, 2025 - January 4, 2026",
        location: "Wimberley",
        price: "$5-10",
        featured: false,
      },
      {
        name: "Cowboy Capital Christmas",
        description: "Holiday events, parade, and shopping in the Cowboy Capital of the World.",
        date: "December 1-31, 2025",
        location: "Bandera",
        price: "Free-$5",
        featured: false,
      },
      
      // Ongoing Events Throughout Period
      {
        name: "Texas Hill Country Wineries Passport Events",
        description: "Multiple signature passport events annually allowing tasting at multiple wineries with one pass.",
        date: "Summer, Fall & Christmas 2025",
        location: "Various Hill Country Wineries",
        price: "$35-65",
        featured: false,
      },
      {
        name: "Live Music at Gruene Hall",
        description: "Texas's oldest dance hall hosts live music almost nightly with touring artists.",
        date: "Year-round 2025",
        location: "Gruene",
        price: "$15-45",
        featured: false,
      },
      {
        name: "Live Music at Luckenbach Dance Hall",
        description: "Iconic Texas dance hall with regular schedule of country and Americana artists.",
        date: "Year-round 2025",
        location: "Luckenbach",
        price: "$10-35",
        featured: false,
      },
      {
        name: "First Friday Art Walk",
        description: "Galleries and shops extend hours and host special showings on the first Friday of each month.",
        date: "First Friday Monthly",
        location: "Fredericksburg",
        price: "Free",
        featured: false,
      },
      {
        name: "First Saturday Living History",
        description: "Pioneer Museum demonstrations and reenactments showcasing pioneer life.",
        date: "First Saturday Monthly",
        location: "Fredericksburg",
        price: "$8-12",
        featured: false,
      },
      {
        name: "Paramount Summer Classic Film Series",
        description: "Classic film screenings in the historic Paramount Theatre through summer.",
        date: "June - August 2025",
        location: "Austin",
        price: "$12-18",
        featured: false,
      },
      {
        name: "Zilker Summer Musical",
        description: "Free outdoor musical performances at Zilker Hillside Theater.",
        date: "Late June - Mid August 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Blues on the Green",
        description: "Free family-friendly outdoor concert series in Zilker Park.",
        date: "Summer 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      
      // More June Events
      {
        name: "H-E-B Free First Sunday: Juneteenth",
        description: "Special Juneteenth programming at the Bullock Texas State History Museum.",
        date: "June 1, 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Whiskey, Cigar and Steak Bash",
        description: "Premium themed culinary event in the Hill Country.",
        date: "June 7, 2025",
        location: "Bankersmith",
        price: "$75-125",
        featured: false,
      },
      {
        name: "Celebrate Comfort 5K Fun Run/Walk",
        description: "Community race and WATER! celebration in historic Comfort.",
        date: "June 7, 2025",
        location: "Comfort",
        price: "$25-35",
        featured: false,
      },
      {
        name: "Fredericksburg Music Festival and School",
        description: "Classical music performances and educational programs.",
        date: "June 8-21, 2025",
        location: "Fredericksburg",
        price: "$15-45",
        featured: false,
      },
      {
        name: "Driftwood Chiggerfest",
        description: "Local festival with music and community focus in scenic Driftwood.",
        date: "June 14-15, 2025",
        location: "Driftwood",
        price: "$10-15",
        featured: false,
      },
      {
        name: "Pop Punk's Not Dead Fest",
        description: "Music festival celebrating pop punk and alternative music.",
        date: "June 7, 2025",
        location: "Buda",
        price: "$25-45",
        featured: false,
      },
      {
        name: "Cello Recital at Becker Vineyards",
        description: "Classical music performance 'Hinges' at popular Hill Country winery.",
        date: "June 20, 2025",
        location: "Fredericksburg",
        price: "$35-50",
        featured: false,
      },
      {
        name: "Fredericksburg Cow Cuddling",
        description: "Unique farm experience connecting with gentle farm animals.",
        date: "June 20, 2025",
        location: "Fredericksburg",
        price: "$25-40",
        featured: false,
      },
      {
        name: "Austin Road Show - Texas Hill Country Wineries",
        description: "Hill Country wineries come to Austin for special tasting event.",
        date: "June 27, 2025",
        location: "Austin",
        price: "$45-75",
        featured: false,
      },
      {
        name: "Texas Testicle Bash",
        description: "Unique culinary event celebrating Texas ranch traditions.",
        date: "June 28, 2025",
        location: "Bankersmith",
        price: "$35-55",
        featured: false,
      },
      {
        name: "Ferrel Ranch Vertical Tasting",
        description: "Ursa Cabernet Sauvignon and Tannat vertical tasting at Bending Branch Winery.",
        date: "June 28, 2025",
        location: "Comfort",
        price: "$55-85",
        featured: false,
      },
      
      // More July Events
      {
        name: "Hill Country Fun Fest",
        description: "Community festival with activities and entertainment for all ages.",
        date: "July 3, 2025",
        location: "Kerrville",
        price: "$8-12",
        featured: false,
      },
      {
        name: "La Vernia 4th of July Festival",
        description: "Small town Independence Day celebration with family activities.",
        date: "July 4, 2025",
        location: "La Vernia",
        price: "Free",
        featured: false,
      },
      {
        name: "Fredericksburg Crab Bash",
        description: "Seafood culinary event featuring fresh crab and Hill Country hospitality.",
        date: "July 12, 2025",
        location: "Bankersmith",
        price: "$45-75",
        featured: false,
      },
      {
        name: "Balcones Heights Jazz Festival",
        description: "Free outdoor jazz concerts near Hill Country.",
        date: "July 18, 2025",
        location: "San Antonio",
        price: "Free",
        featured: false,
      },
      {
        name: "MLS All Star Game",
        description: "Major League Soccer All Star event at Q2 Stadium.",
        date: "July 23, 2025",
        location: "Austin",
        price: "$45-150",
        featured: false,
      },
      {
        name: "Cowboy Breakfast",
        description: "Huge free breakfast kicking off rodeo season.",
        date: "Late July 2025",
        location: "San Antonio",
        price: "Free",
        featured: false,
      },
      
      // More August Events
      {
        name: "Summer Horse Racing",
        description: "Horse racing at Gillespie County Fairgrounds continuing from July.",
        date: "August 2025",
        location: "Fredericksburg",
        price: "$8-15",
        featured: false,
      },
      {
        name: "Peach Festival & Orchard Events",
        description: "Local orchards hold peach-themed events and picking opportunities.",
        date: "August 2025",
        location: "Fredericksburg & Stonewall",
        price: "$5-15",
        featured: false,
      },
      {
        name: "SPAH Harmonica Convention",
        description: "Society for Preservation and Advancement of Harmonica annual gathering.",
        date: "August 12-16, 2025",
        location: "San Antonio",
        price: "$35-65",
        featured: false,
      },
      {
        name: "Beer by the Bay Music Festival",
        description: "Music festival with craft beer in scenic Horseshoe Bay.",
        date: "August 8-9, 2025",
        location: "Horseshoe Bay",
        price: "$25-45",
        featured: false,
      },
      
      // More September Events
      {
        name: "Foxtoberfest at 12 Fox Beer Co.",
        description: "Oktoberfest-inspired celebration at local brewery.",
        date: "Late September 2025",
        location: "Dripping Springs",
        price: "$15-25",
        featured: false,
      },
      {
        name: "Pumpkin Patch at Marble Falls",
        description: "Farm activities, mazes, and pumpkin patch for families.",
        date: "Mid-September - Mid-November 2025",
        location: "Marble Falls",
        price: "$8-15",
        featured: false,
      },
      {
        name: "Cold Waves Austin",
        description: "Industrial and electronic music festival.",
        date: "September 19, 2025",
        location: "Austin",
        price: "$35-65",
        featured: false,
      },
      
      // More October Events
      {
        name: "Boo at the Zoo",
        description: "Family-friendly Halloween event at Austin Zoo.",
        date: "October Weekends 2025",
        location: "Austin",
        price: "$12-18",
        featured: false,
      },
      {
        name: "Austoberfest",
        description: "German heritage celebration at historic Scholz Garten.",
        date: "October 25, 2025",
        location: "Austin",
        price: "$15-25",
        featured: false,
      },
      {
        name: "Austin Symphony Halloween Children's Concert",
        description: "Fun costumed concert for kids and families.",
        date: "Late October 2025",
        location: "Austin",
        price: "$12-20",
        featured: false,
      },
      {
        name: "Night Market",
        description: "Asian-themed market with food, music, and vendors.",
        date: "October 18, 2025",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Salmon Lake Bluegrass",
        description: "Bluegrass music festival in scenic East Texas near Hill Country.",
        date: "October 23-25, 2025",
        location: "Grapeland",
        price: "$25-45",
        featured: false,
      },
      
      // More November Events
      {
        name: "There's Only One S in New Braunfels Festival",
        description: "Local festival with unique name celebrating community spirit.",
        date: "November 1, 2025",
        location: "Gruene",
        price: "$5-10",
        featured: false,
      },
      {
        name: "Light Up Christmas Parade",
        description: "Holiday parade lighting up the streets of Marble Falls.",
        date: "November 21, 2025",
        location: "Marble Falls",
        price: "Free",
        featured: false,
      },
      {
        name: "Downtown Christmas Tree Lighting",
        description: "Community tree lighting ceremony kicking off holiday season.",
        date: "November 14, 2025",
        location: "Marble Falls",
        price: "Free",
        featured: false,
      },
      {
        name: "Wild Game Dinner",
        description: "Unique dinner featuring local wild game and Texas traditions.",
        date: "November 29, 2025",
        location: "Junction",
        price: "$35-55",
        featured: false,
      },
      {
        name: "Mingle & Jingle",
        description: "Holiday community event with music and festivities.",
        date: "November 29, 2025",
        location: "Kilgore",
        price: "Free",
        featured: false,
      },
      {
        name: "Seismic Dance Event",
        description: "Electronic music festival bringing top DJs to Austin.",
        date: "November 14-16, 2025",
        location: "Austin",
        price: "$85-175",
        featured: false,
      },
      
      // More December Events
      {
        name: "Hill Country Chorale Christmas Concert",
        description: "Local chorale performance featuring traditional Christmas music.",
        date: "December 6, 2025",
        location: "Kerrville",
        price: "$15-25",
        featured: false,
      },
      {
        name: "Breakfast with Santa",
        description: "Kid-friendly holiday event with breakfast and Santa photos.",
        date: "December 6, 2025",
        location: "Marble Falls",
        price: "$12-18",
        featured: false,
      },
      {
        name: "The Winter Wonderettes",
        description: "Holiday musical production at Hill Country Community Theatre.",
        date: "Various December 2025 Dates",
        location: "Marble Falls",
        price: "$15-25",
        featured: false,
      },
      {
        name: "New Year's Eve Celebrations",
        description: "Various towns host special NYE parties, concerts, and countdown events.",
        date: "December 31, 2025",
        location: "Various Hill Country Towns",
        price: "$25-85",
        featured: false,
      },
    ];
    
    for (const event of sampleEvents) {
      await this.createEvent(event);
    }
    
    // Create 5 detailed blog posts
    const blog1: InsertBlogPost = {
      title: "Bluebonnet Season 2025: Complete Guide to Peak Wildflower Viewing",
      slug: "bluebonnet-season-2025-complete-guide",
      excerpt: "Your comprehensive guide to experiencing Texas Hill Country's most spectacular bluebonnet displays this spring, including exact locations, timing, and photography tips.",
      content: "Texas Hill Country transforms into a stunning blue carpet every spring when bluebonnets reach peak bloom. The 2025 season promises to be exceptional, with optimal rainfall patterns creating ideal conditions for widespread wildflower displays across the region.\n\nBest Viewing Locations:\n\nEnnis Bluebonnet Trail remains the gold standard for bluebonnet viewing. This 40-mile drive through Ellis County showcases thousands of acres of bluebonnets alongside Indian paintbrush and other wildflowers. Peak viewing typically occurs from mid-March through early April.\n\nFredericksburg area offers incredible diversity with bluebonnets carpeting the roadsides along Highway 290. The combination of rolling hills and historic German architecture creates picture-perfect scenes. Don't miss the Willow City Loop, a 13-mile scenic drive that winds through private ranches with permission for roadside viewing.\n\nBurnet County, known as the 'Bluebonnet Capital of Texas,' features several prime locations including Park Road 4 near Inks Lake State Park. The contrast of bluebonnets against pink granite outcroppings is truly spectacular.\n\nTiming Your Visit:\n\nThe 2025 bluebonnet season is expected to begin in early March in South Texas, progressing northward through Hill Country. Peak bloom in the Austin-Fredericksburg area typically occurs between March 20th and April 10th, depending on weather conditions.\n\nMorning visits between 8-10 AM provide the best lighting for photography and cooler temperatures for comfortable viewing. Avoid midday visits when harsh sunlight washes out the vibrant blue colors.\n\nPhotography Tips:\n\nCapture the classic Texas shot by getting low to the ground and using bluebonnets as foreground elements. A polarizing filter helps reduce glare and enhance color saturation. For family photos, respect the flowers by having subjects sit beside, not in, the bluebonnet patches.\n\nConservation Notes:\n\nTexas law protects bluebonnets on public property, but many prime viewing areas are on private land. Always respect property rights and 'Take Only Pictures, Leave Only Footprints.' The Texas Department of Transportation carefully maintains roadside bluebonnet populations through controlled mowing schedules.\n\nPlanning Your Hill Country Bluebonnet Adventure:\n\nCombine bluebonnet viewing with Hill Country wineries, historic towns, and local restaurants for a complete experience. Book accommodations early as spring is peak tourism season. Consider staying in Fredericksburg, Austin, or Llano for easy access to multiple viewing areas.\n\nThe economic impact of bluebonnet tourism exceeds $2.3 billion annually for Texas, supporting local communities throughout Hill Country. Plan your 2025 bluebonnet adventure and experience why these wildflowers are beloved symbols of Texas spring.",
      imageUrl: "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Photography",
      author: "Sarah Johnson",
      authorInitials: "SJ",
      publishDate: "January 15, 2025",
      readTime: "12 min read",
    };

    const blog2: InsertBlogPost = {
      title: "Texas Hill Country Wine Trail 2025: New Vineyards and Tasting Experiences",
      slug: "hill-country-wine-trail-2025",
      excerpt: "Discover the latest additions to Hill Country's renowned wine scene, featuring new vineyard openings, innovative tasting experiences, and award-winning varietals.",
      content: "Texas Hill Country's wine industry continues its remarkable growth in 2025, with over 50 wineries now calling this region home. The unique terroir created by limestone soils, elevation changes, and continental climate produces exceptional wines that rival traditional wine regions.\n\nNew Vineyard Openings in 2025:\n\nPedernales Cellars has opened their second location in Stonewall, featuring a state-of-the-art tasting room with panoramic views of the Pedernales River valley. Their 2024 Tempranillo won Double Gold at the San Francisco Chronicle Wine Competition.\n\nSpicewood Vineyards expanded with their Reserve Tasting experience, offering library wines and vertical tastings of their acclaimed Sauvignon Blanc. The vineyard's hilltop location provides 360-degree views of Hill Country.\n\nBecker Vineyards introduced their 'Vineyard to Table' experience, pairing estate wines with locally-sourced cuisine prepared by James Beard Award nominees. Reservations book months in advance.\n\nSignature Hill Country Varietals:\n\nTempranillo thrives in Hill Country's climate, producing full-bodied reds with notes of leather, tobacco, and dark fruit. Llano Estacado and Fall Creek Vineyards produce exceptional examples.\n\nViognier, the signature white of the region, offers floral aromatics and stone fruit flavors. Duchman Family Winery's Viognier consistently receives 90+ point ratings from wine critics.\n\nSangiovese adapts beautifully to limestone soils, creating elegant wines with bright acidity and cherry notes. Grape Creek Vineyards leads production of this Italian varietal.\n\nTasting Room Innovations:\n\nVirtual reality experiences at several wineries now transport visitors through the winemaking process, from grape harvest to bottle aging. Messina Hof Estate offers immersive tours showcasing their sustainable farming practices.\n\nFood and wine pairing classes have expanded beyond traditional offerings. Chisholm Trail Winery features Texas BBQ pairings, while Mandola Estate focuses on Italian-inspired cuisine.\n\nWine and Art collaborations showcase local artists in tasting rooms. Lost Oak Winery rotates exhibitions monthly, supporting Hill Country's vibrant arts community.\n\nSustainable Practices:\n\nMany Hill Country wineries embrace sustainable and organic practices. Brennan Vineyards achieved organic certification in 2024, while Kuhlman Cellars utilizes solar power and rainwater harvesting.\n\nCover crops between vine rows prevent erosion and improve soil health. Native Texas plants in landscaping support local wildlife and reduce water usage.\n\nPlanning Your Wine Trail Adventure:\n\nDesignate a driver or book transportation through Hill Country Wine Tours for safe travels between vineyards. Many wineries offer food service, but reservations are recommended during peak season.\n\nSpring (March-May) and fall (September-November) provide ideal weather for outdoor tastings. Summer visits focus on air-conditioned tasting rooms and covered patios.\n\nWine club memberships offer exclusive access to limited releases and special events. Most clubs ship nationwide for those wanting to continue the Hill Country experience at home.\n\nThe Texas Hill Country Wine Trail represents a $2.8 billion industry supporting over 8,000 jobs. Each visit supports family-owned businesses and agricultural preservation in this beautiful region.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Wine & Dining",
      author: "Mike Rodriguez",
      authorInitials: "MR",
      publishDate: "January 8, 2025",
      readTime: "15 min read",
    };

    const blog3: InsertBlogPost = {
      title: "Ultimate Family Adventure Guide: Hill Country with Kids in 2025",
      slug: "family-adventure-guide-hill-country-kids-2025",
      excerpt: "Create unforgettable family memories with our comprehensive guide to kid-friendly attractions, swimming holes, and educational experiences throughout Texas Hill Country.",
      content: "Texas Hill Country offers endless family adventures, combining natural beauty with engaging activities that captivate children while creating lasting memories. This comprehensive guide covers the best family destinations updated for 2025.\n\nTop Swimming Destinations:\n\nJacob's Well in Wimberley remains the crown jewel of Hill Country swimming holes. This artesian spring maintains a constant 68-70°F temperature year-round. Advance reservations are required through the Hays County Parks system. The crystal-clear water and surrounding cypress trees create a magical swimming experience.\n\nBarton Springs Pool in Austin offers family-friendly swimming in downtown convenience. The spring-fed pool maintains 68-70°F temperatures, perfect for year-round swimming. The surrounding Zilker Park provides picnic areas and playgrounds.\n\nKrause Springs features multiple spring-fed pools, camping, and hiking trails. The natural swimming holes range from shallow kiddie areas to deeper pools for stronger swimmers. Weekend visits require advance reservations.\n\nEducational Adventures:\n\nNatural Bridge Caverns offers underground exploration suitable for ages 4+. The 60-foot natural limestone bridge entrance leads to spectacular cave formations. Educational programs teach geology and conservation.\n\nAustin Nature & Science Center combines indoor exhibits with outdoor trails. The Discovery Lab features hands-on activities exploring Hill Country ecosystems. Live animal exhibits showcase native Texas wildlife.\n\nGeorge Ranch Historical Park provides living history experiences. Children can participate in cowboy activities, blacksmithing demonstrations, and period cooking classes.\n\nOutdoor Adventures:\n\nEnchanted Rock State Natural Area offers family-friendly hiking to the summit of this massive pink granite dome. Early morning visits avoid crowds and provide cooler temperatures for the 425-foot elevation gain.\n\nInks Lake State Park features calm waters perfect for kayaking with children. Equipment rentals and guided tours accommodate all skill levels. The park's geology trail teaches about regional rock formations.\n\nSeasonal Family Events:\n\nFredericksburg Herb Farm's Spring Festival (March) features herb planting workshops, garden tours, and children's activities. The working farm demonstrates sustainable agriculture practices.\n\nLuckenbach Texas hosts family-friendly music events throughout the year. The historic general store and outdoor stage create authentic Texas experiences.\n\nWimberley Market Days (first Saturday of each month) combines shopping with family entertainment. Local artisans offer hands-on demonstrations of traditional crafts.\n\nAccommodation Recommendations:\n\nGuest ranches provide immersive experiences with horseback riding, fishing, and wildlife viewing. Y.O. Ranch and Flying L Guest Ranch offer family packages including meals and activities.\n\nVacation rentals along the Guadalupe River provide private access to tubing and swimming. Many properties include game rooms and outdoor spaces perfect for families.\n\nState park cabins offer affordable accommodations within natural settings. Garner State Park and Lost Maples provide fully-equipped cabins steps from hiking trails and rivers.\n\nSafety Considerations:\n\nTexas heat requires constant hydration and sun protection. Morning activities avoid peak temperatures. Always supervise children around water, as Hill Country rivers can have unexpected currents.\n\nWildlife encounters are possible throughout the region. Teach children to observe animals from distances and never feed wildlife. Carry first aid supplies and know locations of nearest medical facilities.\n\nPlanning Tips:\n\nSpring (March-May) and fall (October-November) provide ideal weather for outdoor activities. Summer visits focus on water activities and air-conditioned attractions.\n\nMany attractions offer military and AAA discounts. Group rates apply for families of 6+ members. Consider annual passes for state parks if planning multiple visits.\n\nHill Country's family tourism generates over $800 million annually, supporting communities while preserving natural and cultural resources for future generations.",
      imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Family Travel",
      author: "Lisa Martinez",
      authorInitials: "LM",
      publishDate: "January 28, 2025",
      readTime: "18 min read",
    };

    const blog4: InsertBlogPost = {
      title: "German Heritage Trail: Exploring Hill Country's Authentic Cultural Legacy",
      slug: "german-heritage-trail-hill-country-culture",
      excerpt: "Journey through the living history of German immigration to Texas Hill Country, discovering authentic architecture, traditional festivals, and culinary traditions preserved for over 175 years.",
      content: "German immigration to Texas Hill Country began in the 1840s, creating a unique cultural landscape that thrives today. The Adelsverein, a German colonization company, established settlements that preserved European traditions while adapting to Texas frontier life.\n\nHistoric Towns and Architecture:\n\nFredericksburg, founded in 1846, showcases the most extensive collection of German colonial architecture in America. The Pioneer Museum Complex features original log structures, including the Kammlah House and Weber Sunday House. These 'Sunday Houses' allowed rural German families to stay in town during weekend church services.\n\nNew Braunfels, established in 1845, maintains its German character through the historic Hauptstrasse (Main Street). The Sophienburg Museum preserves artifacts from Prince Carl of Solms-Braunfels, the town's founder. Original limestone buildings house businesses maintaining German traditions.\n\nComfort, founded in 1854, features the most intact collection of German Hill Country architecture. The High Point Restaurant building (1880) and Ingenhuett-Faust Hotel (1880) demonstrate German craftsmanship adapted to Texas materials and climate.\n\nAuthentic Festivals and Traditions:\n\nFredericksburg's Oktoberfest (October) transforms the town into a Bavarian celebration featuring traditional music, dancing, and cuisine. Local German bands perform alongside authentic Bavarian groups. Traditional costumes and folk dances maintain cultural connections.\n\nWurstfest in New Braunfels (November) celebrates German sausage-making traditions with competitions, demonstrations, and tastings. The 10-day festival features over 50 varieties of authentic German sausages alongside traditional accompaniments.\n\nMaifest celebrations throughout Hill Country honor spring traditions with maypole dancing, flower crowns, and community gatherings. These festivals maintain community bonds established by original German settlers.\n\nCulinary Heritage:\n\nAuthentic German bakeries continue traditions passed down through generations. Dietz Bakery in Fredericksburg, operating since 1947, produces traditional strudels, pretzels, and German breads using original recipes.\n\nGerman meat markets specialize in traditional sausages and smoked meats. Opa's Smoked Meats and Krause Biergarten maintain authentic preparation methods using local ingredients.\n\nSchnitzels, sauerbraten, and spaetzle appear on menus throughout Hill Country. Restaurant critics recognize authentic establishments for maintaining traditional preparation techniques.\n\nBrewing Traditions:\n\nGerman brewing heritage influences Hill Country's craft beer scene. Krause Biergarten in New Braunfels occupies the site of original German brewery ruins. Traditional German beer styles include authentic recipes and brewing techniques.\n\nFredericksburg Brewery produces German-style lagers and wheat beers using traditional methods. Their Oktoberfest beer follows 500-year-old Bavarian purity laws, using only hops, malt, water, and yeast.\n\nReal Ale Brewing Company combines German brewing traditions with Texas ingredients. Their award-winning beers reflect both heritage and innovation in craft brewing.\n\nPreservation Efforts:\n\nThe German-Texan Heritage Society works to preserve cultural traditions and historical sites. Educational programs teach German language, customs, and traditional crafts to new generations.\n\nHistoric preservation efforts maintain original buildings and architectural details. The Texas Historical Commission recognizes numerous German Hill Country sites on the National Register of Historic Places.\n\nCultural exchange programs connect Hill Country communities with sister cities in Germany. These relationships strengthen cultural bonds and promote heritage tourism.\n\nPlanning Your Heritage Journey:\n\nSelf-guided driving tours connect major German settlements with historical markers and interpretive signs. The German Heritage Trail covers over 100 miles of scenic Hill Country roads.\n\nMuseum visits provide context for cultural history and preservation efforts. Many sites offer guided tours with knowledgeable interpreters sharing family stories and traditions.\n\nFestival seasons (spring and fall) offer the most authentic cultural experiences. However, German heritage remains visible year-round through architecture, businesses, and community traditions.\n\nThe German heritage tourism contributes over $400 million annually to Hill Country's economy while preserving irreplaceable cultural resources for future generations.",
      imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Culture & History",
      author: "Thomas Weber",
      authorInitials: "TW",
      publishDate: "February 15, 2025",
      readTime: "16 min read",
    };

    const blog5: InsertBlogPost = {
      title: "Hidden Hiking Trails: Secret Spots Beyond the Tourist Crowds",
      slug: "hidden-hiking-trails-secret-spots-hill-country",
      excerpt: "Discover secluded trails and pristine natural areas that offer authentic Hill Country experiences away from popular destinations, featuring detailed trail guides and insider tips.",
      content: "While Enchanted Rock draws thousands of visitors, Texas Hill Country conceals dozens of lesser-known trails offering solitude, spectacular views, and unique natural features. These hidden gems provide authentic wilderness experiences for those willing to venture beyond mainstream destinations.\n\nGovernment Canyon State Natural Area - Wilderness Trails:\n\nLocated 20 miles northwest of San Antonio, Government Canyon protects 12,000 acres of diverse Hill Country ecosystems. The Joe Johnston Route (5.2 miles) traverses rugged terrain to limestone cliffs overlooking the Balcones Escarpment.\n\nTrail Difficulty: Moderate to Strenuous\nElevation Gain: 600 feet\nHighlights: Fossil formations, spring-fed pools, panoramic views\nBest Time: October through April\nPermit Required: Yes, advance reservations through Texas Parks & Wildlife\n\nThe Recharge Trail (2.1 miles) provides easier access to the park's unique recharge zone where surface water disappears into underground aquifers. Interpretive signs explain the Edwards Aquifer's critical role in regional water supply.\n\nWestcave Outdoor Discovery Center - Canyon Trail:\n\nThis preserve protects a unique microclimate created by Hamilton Creek's canyon environment. The guided trail (0.75 miles) descends 40 feet into a limestone grotto featuring a 40-foot waterfall and hanging gardens of maidenhair ferns.\n\nTrail Difficulty: Easy to Moderate\nGuided Tours: Required, limited to 30 people\nHighlights: Waterfall, rare plant communities, geological formations\nReservations: Essential, especially spring and fall\n\nThe preserve represents a relict environment from 10,000 years ago when Hill Country's climate was cooler and moister. Rare plant species include Texas wild rice and several endangered orchid varieties.\n\nDevil's Backbone Scenic Area - Hidden Overlooks:\n\nRanch Road 32 between Wimberley and Blanco offers roadside access to unofficial overlooks and short trails. The Devil's Backbone name comes from the narrow ridge's resemblance to a spine when viewed from valleys below.\n\nSecret Overlook Trail (0.8 miles): Unmarked path begins at mile marker 7.2, leading to panoramic views of the Blanco River valley.\n\nCypress Creek Trail (1.5 miles): Follows creek bed through private property with landowner permission. Features deep swimming holes and limestone caverns.\n\nTrail Etiquette: Respect private property, pack out all trash, avoid disturbing wildlife\n\nOld Baldy - Comfort Area:\n\nThis 1,650-foot peak near Comfort offers 360-degree views without the crowds of Enchanted Rock. The unofficial trail (2.3 miles roundtrip) crosses private ranch land with traditional landowner permission.\n\nTrail Difficulty: Moderate\nElevation Gain: 400 feet\nAccess: Through Comfort, requires landowner contact\nHighlights: Solitude, panoramic views, wildflower displays\n\nSpring visits (March-April) showcase spectacular wildflower displays including bluebonnets, Indian paintbrush, and evening primrose. The summit provides views extending to Austin's skyline on clear days.\n\nLost Maples State Natural Area - Remote Sections:\n\nWhile Lost Maples attracts fall foliage enthusiasts, remote sections offer year-round solitude. The Limestone Ridge Trail (4.2 miles) explores the park's northern wilderness away from main attractions.\n\nTrail Difficulty: Strenuous\nElevation Change: 350 feet\nHighlights: Bigtooth maples, limestone canyons, wildlife viewing\nBest Seasons: Fall for foliage, spring for wildflowers\n\nThe East Trail (2.8 miles) follows the Sabinal River through deep pools and limestone formations. Swimming opportunities abound, but water levels vary seasonally.\n\nGarner State Park - Backcountry Areas:\n\nBeyond the popular Frio River activities, Garner's backcountry trails provide solitude and wildlife viewing. The Hill Country Back Trail (6.1 miles) traverses diverse habitats from river bottoms to hilltop prairies.\n\nWildlife spotting includes white-tailed deer, armadillos, and over 240 bird species. Spring mornings offer the best opportunities for viewing painted buntings and golden-cheeked warblers.\n\nThe Old Baldy Trail (1.9 miles) climbs to the park's highest point, offering views of the Frio River valley and surrounding ranchland.\n\nSafety and Conservation:\n\nMany hidden trails cross private property requiring landowner permission. Texas tradition grants permission for respectful visitors, but always ask first.\n\nCarry adequate water, as natural sources may be unreliable. Summer temperatures exceed 100°F, making early morning starts essential.\n\nWildlife encounters include venomous snakes, aggressive javelinas, and occasional mountain lions. Make noise while hiking and carry first aid supplies.\n\nLeave No Trace principles preserve these pristine areas for future visitors. Pack out all trash, stay on established trails, and avoid disturbing wildlife.\n\nNavigation and Access:\n\nMany trails lack official markers or maintained paths. GPS devices and topographic maps provide essential navigation tools.\n\nCell phone coverage varies throughout Hill Country. Inform others of hiking plans and expected return times.\n\nSeasonal considerations include hunting seasons on private land, flash flood potential during spring rains, and extreme heat during summer months.\n\nConservation Impact:\n\nThese hidden trails represent fragile ecosystems requiring careful stewardship. Volunteer opportunities with Texas Parks & Wildlife and local conservation groups help maintain trail access and environmental protection.\n\nLand trusts work with private landowners to preserve critical habitat while maintaining traditional land uses. These partnerships ensure future access to Hill Country's natural treasures.\n\nResponsible hiking practices protect sensitive areas while supporting conservation efforts that maintain Hill Country's natural character for future generations.",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Outdoor Adventure",
      author: "Alex Davis",
      authorInitials: "AD",
      publishDate: "March 1, 2025",
      readTime: "20 min read",
    };

    // Create all 5 blog posts
    await this.createBlogPost(blog1);
    await this.createBlogPost(blog2);
    await this.createBlogPost(blog3);
    await this.createBlogPost(blog4);
    await this.createBlogPost(blog5);
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(d => d.featured);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { ...insertDestination, id, featured: insertDestination.featured || false };
    this.destinations.set(id, destination);
    return destination;
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getActivitiesByCategory(category: string): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(a => a.category === category);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(e => e.featured);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id, featured: insertEvent.featured || false };
    this.events.set(id, event);
    return event;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
}

export const storage = new MemStorage();