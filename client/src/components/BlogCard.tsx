import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  blogPost: BlogPost;
}

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

export default function BlogCard({ blogPost }: BlogCardProps) {
  return (
    <Link href={`/blog/${blogPost.id}`}>
      <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        <img 
          src={blogPost.imageUrl} 
          alt={blogPost.title}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className={categoryColors[blogPost.category] || "bg-gray-100 text-gray-700"}>
              {blogPost.category}
            </Badge>
            <span className="text-gray-500 text-sm">{blogPost.publishDate}</span>
          </div>
          <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3 hover:text-bluebonnet-500 transition-colors">
            {blogPost.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {blogPost.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 ${authorColors[blogPost.authorInitials] || 'bg-gray-500'} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                {blogPost.authorInitials}
              </div>
              <span className="ml-2 text-gray-700 text-sm">{blogPost.author}</span>
            </div>
            <span className="text-gray-500 text-sm">{blogPost.readTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
