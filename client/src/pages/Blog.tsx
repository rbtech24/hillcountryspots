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
      <section className="py-20 bg-gradient-to-r from-bluebonnet-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Travel Stories & Tips
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
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

              {/* Newsletter Signup Card */}
              <Card className="bluebonnet-gradient rounded-2xl p-8 text-white flex flex-col justify-center">
                <div className="text-center">
                  <RectangleEllipsis className="h-16 w-16 mb-4 opacity-80 mx-auto" />
                  <h3 className="font-playfair text-2xl font-bold mb-3">Stay Updated</h3>
                  <p className="mb-6 opacity-90">Get the latest Hill Country travel tips and insider guides delivered to your inbox.</p>
                  <div className="space-y-3">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-white text-gray-800"
                    />
                    <Button className="w-full bg-white text-bluebonnet-500 hover:bg-gray-100 font-semibold">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
