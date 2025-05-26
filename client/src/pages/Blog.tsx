import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RectangleEllipsis } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-r from-bluebonnet-500 to-purple-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Travel Stories & Tips
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white drop-shadow-md">
            Get inspired with insider tips, travel stories, and expert guides from Hill Country explorers
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : blogPosts?.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No blog posts available</h3>
              <p className="text-gray-600">Check back soon for new travel stories and tips!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <BlogCard key={post.id} blogPost={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
