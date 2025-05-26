import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import { updatePageSEO } from "@/lib/seo";
import type { Destination } from "@shared/schema";

export default function Destinations() {
  useEffect(() => {
    updatePageSEO({
      title: "Texas Hill Country Destinations - Fredericksburg, Austin & Wimberley | Hill Country Spots",
      description: "Explore the top destinations in Texas Hill Country including historic Fredericksburg, vibrant Austin, charming Wimberley, and scenic Dripping Springs. Find the perfect Hill Country town for your getaway.",
      keywords: "Hill Country destinations, Fredericksburg Texas, Austin Texas, Wimberley Texas, Dripping Springs, Hill Country towns, Texas travel destinations",
      ogImage: "https://hillcountryspots.com/attached_assets/shutterstock_2325059655.jpg",
      canonicalUrl: "https://hillcountryspots.com/destinations"
    });
  }, []);

  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-bluebonnet-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Hill Country Destinations
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white drop-shadow-md">
            Discover the charming towns, natural wonders, and hidden gems that make Texas Hill Country unforgettable
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : destinations?.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No destinations available</h3>
              <p className="text-gray-600">Check back soon for new destinations to explore!</p>
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
    </div>
  );
}
