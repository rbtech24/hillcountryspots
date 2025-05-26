import { Mountain } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-12 h-12 bluebonnet-gradient rounded-xl flex items-center justify-center">
        <Mountain className="text-white text-xl" />
      </div>
      <div>
        <h1 className="font-playfair font-bold text-2xl text-gray-800">Hill Country Spots</h1>
        <p className="text-sm text-bluebonnet-500 font-dancing">Discover Texas Beauty</p>
      </div>
    </div>
  );
}
