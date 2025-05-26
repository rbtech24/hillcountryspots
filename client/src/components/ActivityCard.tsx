import { Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Activity } from "@shared/schema";

interface ActivityCardProps {
  activity: Activity;
}

const iconMap: Record<string, string> = {
  "wine-glass": "🍷",
  "water": "🌊",
  "landmark": "🏛️",
  "hiking": "🥾",
  "fire": "🔥",
  "star": "⭐",
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const iconColor = activity.category === "Wine & Dining" ? "text-purple-500" :
                   activity.category === "Water Activities" ? "text-bluebonnet-500" :
                   activity.category === "Culture" ? "text-purple-500" :
                   activity.category === "Outdoor" ? "text-green-500" :
                   "text-red-500";

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-playfair text-xl font-bold text-gray-800">
            {activity.name}
          </h3>
          <span className={`text-2xl ${iconColor}`}>
            {iconMap[activity.icon] || "🎯"}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          {activity.description}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{activity.duration}</span>
          <span className="mx-2">•</span>
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{activity.price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
