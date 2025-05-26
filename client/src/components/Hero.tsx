import { Button } from "@/components/ui/button";
import { Compass, Play, ChevronDown } from "lucide-react";
import hillCountryImage from "@assets/hill country.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hillCountryImage})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
          Discover the Magic of
          <span className="text-bluebonnet-300 font-dancing block text-6xl md:text-8xl">
            Texas Hill Country
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Explore rolling hills, charming towns, world-class wineries, and endless adventures in America's most beautiful landscape.
        </p>
        <div className="flex justify-center">
          <Button 
            size="lg"
            className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600 transform hover:scale-105 transition-all shadow-lg px-8 py-4 text-lg font-semibold"
          >
            <Compass className="mr-2 h-5 w-5" />
            Explore Destinations
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
