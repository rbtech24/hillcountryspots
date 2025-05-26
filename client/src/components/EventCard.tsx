import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  if (featured) {
    return (
      <Card className="bluebonnet-gradient rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-playfair text-3xl font-bold mb-2">{event.name}</h3>
            <p className="text-bluebonnet-100 text-lg">Annual wildflower celebration</p>
          </div>
          <div className="text-center bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">APR</div>
            <div className="text-3xl font-bold">15</div>
          </div>
        </div>
        <p className="mb-6 text-bluebonnet-50">
          {event.description}
        </p>
        <Button className="bg-white text-bluebonnet-500 hover:bg-gray-100 font-semibold">
          Get Tickets
        </Button>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-playfair text-xl font-bold text-gray-800 mb-1">
            {event.name}
          </h4>
          <p className="text-gray-600 mb-2">{event.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-bluebonnet-500">{event.price}</div>
          <Button variant="ghost" className="text-sm text-bluebonnet-500 hover:text-bluebonnet-700 p-0">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
