import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import type { Activity } from "@shared/schema";

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState("All Activities");
  
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/activities?category=${encodeURIComponent(selectedCategory)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      return response.json();
    },
  });

  const categories = ["All Activities", "Outdoor", "Wine & Dining", "Culture", "Water Activities"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-r from-bluebonnet-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Things to Do
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            From outdoor adventures to cultural experiences, discover endless ways to explore Hill Country
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-bluebonnet-500 text-white hover:bg-bluebonnet-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : activities?.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No activities found</h3>
              <p className="text-gray-600">Try selecting a different category to see more activities.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities?.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
