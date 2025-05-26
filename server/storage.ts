import { destinations, activities, events, blogPosts, type Destination, type Activity, type Event, type BlogPost, type InsertDestination, type InsertActivity, type InsertEvent, type InsertBlogPost } from "@shared/schema";

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
    // Sample Destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Fredericksburg",
        description: "Historic German town famous for wineries, peach orchards, and authentic German cuisine.",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 48,
        tags: ["Wine", "History"],
        featured: true,
      },
      {
        name: "Austin",
        description: "Keep Austin Weird! Live music capital with incredible food scene and outdoor adventures.",
        imageUrl: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 49,
        tags: ["Music", "Food"],
        featured: true,
      },
      {
        name: "Bandera",
        description: "Cowboy Capital of the World with authentic dude ranches and western experiences.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 47,
        tags: ["Ranch", "Western"],
        featured: true,
      },
      {
        name: "New Braunfels",
        description: "Water wonderland with river tubing, Schlitterbahn, and charming German heritage.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 48,
        tags: ["Water", "Adventure"],
        featured: true,
      },
      {
        name: "Wimberley",
        description: "Artisan village with unique shops, galleries, and the famous Wimberley Market Days.",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 46,
        tags: ["Arts", "Shopping"],
        featured: true,
      },
      {
        name: "Dripping Springs",
        description: "Wedding capital with beautiful vineyards, distilleries, and stunning hill country views.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: 47,
        tags: ["Wine", "Scenic"],
        featured: true,
      },
    ];

    for (const destination of sampleDestinations) {
      await this.createDestination(destination);
    }

    // Sample Activities
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
      {
        name: "Historic Walking Tours",
        description: "Discover the rich German heritage and pioneer history that shaped Hill Country culture.",
        imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture",
        duration: "1-2 hours",
        price: "$15-25",
        icon: "landmark",
      },
      {
        name: "Scenic Hiking",
        description: "Explore miles of trails through rolling hills, wildflower fields, and limestone canyons.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "1-6 hours",
        price: "Free-$10",
        icon: "hiking",
      },
      {
        name: "BBQ Trail",
        description: "Taste the best BBQ joints in Texas with guided tours to legendary pit masters.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        duration: "3-5 hours",
        price: "$65-95",
        icon: "fire",
      },
      {
        name: "Stargazing Tours",
        description: "Experience some of the darkest skies in Texas with guided astronomy tours and telescope viewing.",
        imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor",
        duration: "2-3 hours",
        price: "$35-55",
        icon: "star",
      },
    ];

    for (const activity of sampleActivities) {
      await this.createActivity(activity);
    }

    // Sample Events
    const sampleEvents: InsertEvent[] = [
      {
        name: "Bluebonnet Festival",
        description: "Join us for the most beautiful time of year in Hill Country with guided wildflower tours, photography workshops, and local artisan markets.",
        date: "April 15, 2024",
        location: "Hill Country",
        price: "$25",
        featured: true,
      },
      {
        name: "Wine & Music Festival",
        description: "Live music and wine tastings from local vineyards",
        date: "May 20-21, 2024",
        location: "Fredericksburg",
        price: "$45",
        featured: false,
      },
      {
        name: "Hill Country Food Truck Rally",
        description: "Best food trucks from across Texas gather for one weekend",
        date: "June 3-4, 2024",
        location: "Austin",
        price: "Free",
        featured: false,
      },
      {
        name: "Cowboy Capital Rodeo",
        description: "Traditional rodeo with bull riding and barrel racing",
        date: "July 4, 2024",
        location: "Bandera",
        price: "$25",
        featured: false,
      },
    ];

    for (const event of sampleEvents) {
      await this.createEvent(event);
    }

    // Sample Blog Posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "The Ultimate Guide to Photographing Bluebonnets",
        excerpt: "Discover the best locations, timing, and techniques for capturing stunning bluebonnet photos during peak wildflower season in Texas Hill Country.",
        content: "Full content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Photography",
        author: "Sarah Johnson",
        authorInitials: "SJ",
        publishDate: "March 15, 2024",
        readTime: "5 min read",
      },
      {
        title: "5 Must-Visit Wineries on the Texas Wine Trail",
        excerpt: "From family-owned boutique vineyards to award-winning estates, explore the best wineries that showcase the unique terroir of Texas Hill Country.",
        content: "Full content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wine & Dining",
        author: "Mike Rodriguez",
        authorInitials: "MR",
        publishDate: "March 10, 2024",
        readTime: "8 min read",
      },
      {
        title: "Best Family-Friendly Activities in Hill Country",
        excerpt: "Planning a family vacation? Discover the top kid-friendly attractions, swimming holes, and adventures that will create lasting memories for all ages.",
        content: "Full content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Family Travel",
        author: "Lisa Martinez",
        authorInitials: "LM",
        publishDate: "March 5, 2024",
        readTime: "6 min read",
      },
      {
        title: "Exploring the German Heritage of Hill Country",
        excerpt: "Dive into the rich German cultural heritage that shaped Hill Country, from traditional architecture to authentic cuisine and festivals.",
        content: "Full content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Culture & History",
        author: "Tom Wilson",
        authorInitials: "TW",
        publishDate: "February 28, 2024",
        readTime: "7 min read",
      },
      {
        title: "Hidden Hiking Gems: Secret Trails of Hill Country",
        excerpt: "Escape the crowds and discover lesser-known hiking trails that offer stunning views, unique rock formations, and peaceful solitude.",
        content: "Full content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Outdoor Adventure",
        author: "Alex Davis",
        authorInitials: "AD",
        publishDate: "February 20, 2024",
        readTime: "9 min read",
      },
    ];

    for (const blogPost of sampleBlogPosts) {
      await this.createBlogPost(blogPost);
    }
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
    const destination: Destination = { ...insertDestination, id };
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
    const event: Event = { ...insertEvent, id };
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
