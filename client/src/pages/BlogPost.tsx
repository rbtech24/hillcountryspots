import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: blogPost, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", id],
  });

  const categoryColors: Record<string, string> = {
    "Photography": "bg-bluebonnet-100 text-bluebonnet-700",
    "Wine & Dining": "bg-purple-100 text-purple-700",
    "Family Travel": "bg-green-100 text-green-700",
    "Culture & History": "bg-orange-100 text-orange-700",
    "Outdoor Adventure": "bg-red-100 text-red-700",
  };

  const authorColors: Record<string, string> = {
    "SJ": "bg-bluebonnet-500",
    "MR": "bg-purple-500",
    "LM": "bg-green-500",
    "TW": "bg-orange-500",
    "AD": "bg-red-500",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse mb-8"></div>
            <div className="h-64 bg-gray-200 rounded animate-pulse mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Blog Post Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 text-bluebonnet-600 hover:text-bluebonnet-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Badge className={categoryColors[blogPost.category] || "bg-gray-100 text-gray-700"}>
                  {blogPost.category}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blogPost.publishDate}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {blogPost.readTime}
                </div>
              </div>
              
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {blogPost.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                <div className={`w-12 h-12 ${authorColors[blogPost.authorInitials] || 'bg-gray-500'} rounded-full flex items-center justify-center text-white font-bold`}>
                  {blogPost.authorInitials}
                </div>
                <div>
                  <div className="flex items-center text-gray-700">
                    <User className="h-4 w-4 mr-1" />
                    <span className="font-medium">{blogPost.author}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Travel Writer & Hill Country Expert</p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blogPost.imageUrl} 
                alt={blogPost.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {blogPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Enjoyed this article? Share it with fellow Hill Country enthusiasts!
                </p>
                <Link href="/blog">
                  <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600">
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
}