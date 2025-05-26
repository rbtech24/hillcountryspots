import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import type { Event } from "@shared/schema";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const featuredEvent = events?.find(event => event.featured);
  const regularEvents = events?.filter(event => !event.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-r from-bluebonnet-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Hill Country Events
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Join us for festivals, concerts, and celebrations throughout the year in Texas Hill Country
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="space-y-8">
              <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No events scheduled</h3>
              <p className="text-gray-600">Check back soon for upcoming events and festivals!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Event */}
              {featuredEvent && (
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-8 text-center">Featured Event</h2>
                  <div className="max-w-2xl mx-auto">
                    <EventCard event={featuredEvent} featured />
                  </div>
                </div>
              )}

              {/* Regular Events */}
              {regularEvents && regularEvents.length > 0 && (
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-8 text-center">Upcoming Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {regularEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
