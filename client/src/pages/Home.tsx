import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import ActivityCard from "@/components/ActivityCard";
import EventCard from "@/components/EventCard";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Play, RectangleEllipsis, Facebook, Instagram, Twitter, Youtube, Mountain, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import type { Destination, Activity, Event, BlogPost } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Activities");
  
  const { data: destinations, isLoading: destinationsLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations/featured"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const activityCategories = ["All Activities", "Outdoor", "Wine & Dining", "Culture", "Water Activities"];
  
  // Filter activities based on selected category
  const filteredActivities = activities?.filter(activity => 
    selectedCategory === "All Activities" || activity.category === selectedCategory
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />

      {/* Featured Destinations */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From historic towns to natural wonders, discover the gems that make Hill Country special
            </p>
          </div>

          {destinationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations?.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}


        </div>
      </section>

      {/* Things to Do */}
      <section id="activities" className="py-20 bg-gradient-to-b from-bluebonnet-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Things to Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Adventure awaits around every corner in Texas Hill Country
            </p>
          </div>

          {/* Activity Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {activityCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-bluebonnet-500 text-white hover:bg-bluebonnet-600" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {activitiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.slice(0, 6).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't miss these amazing events happening throughout Hill Country
            </p>
          </div>

          {eventsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Featured Event */}
              {events && events.length > 0 && (
                <EventCard event={events[0]} featured />
              )}

              {/* Event List */}
              <div className="space-y-6">
                {events?.slice(1, 4).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link href="/events">
              <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600 px-8 py-3 text-lg font-semibold">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Travel Stories & Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get inspired with insider tips and stories from fellow Hill Country explorers
            </p>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <BlogCard key={post.id} blogPost={post} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600 px-8 py-3 text-lg font-semibold">
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bluebonnet-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Ready to Explore Hill Country?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Start planning your perfect Texas Hill Country adventure today. From wildflower trails to wine tastings, your unforgettable journey awaits.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg"
              className="bg-white text-bluebonnet-500 hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg px-8 py-4 text-lg font-semibold"
            >
              <Compass className="mr-2 h-5 w-5" />
              Plan Your Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bluebonnet-gradient rounded-xl flex items-center justify-center">
                  <Mountain className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl">Hill Country Spots</h3>
                  <p className="text-sm text-gray-400 font-dancing">Discover Texas Beauty</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Your guide to the best destinations, activities, and hidden gems in Texas Hill Country.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-bluebonnet-400 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-bluebonnet-400 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-bluebonnet-400 cursor-pointer transition-colors" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-bluebonnet-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#activities" className="text-gray-400 hover:text-white transition-colors">Things to Do</a></li>
                <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Popular Destinations</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fredericksburg</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Austin</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bandera</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Braunfels</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wimberley</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-bluebonnet-400 mr-3" />
                  <span className="text-gray-400">info@hillcountryspots.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-bluebonnet-400 mr-3" />
                  <span className="text-gray-400">(512) 555-0123</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-bluebonnet-400 mr-3 mt-1" />
                  <span className="text-gray-400">Hill Country, Texas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Hill Country Spots. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
