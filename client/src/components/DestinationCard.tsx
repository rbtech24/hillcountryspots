import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img 
        src={destination.imageUrl} 
        alt={destination.name}
        className="w-full h-64 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-playfair text-2xl font-bold text-gray-800">
            {destination.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-gray-600">{(destination.rating / 10).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {destination.tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className={index === 0 ? "bg-bluebonnet-100 text-bluebonnet-700" : "bg-purple-100 text-purple-700"}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" className="text-bluebonnet-500 hover:text-bluebonnet-700 font-semibold p-0">
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
