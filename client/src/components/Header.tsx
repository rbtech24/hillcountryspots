import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/activities", label: "Things to Do" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur shadow-lg' : 'bg-white shadow-lg'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`transition-colors font-medium ${
                  location === item.href 
                    ? 'text-bluebonnet-500' 
                    : 'text-gray-700 hover:text-bluebonnet-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="https://wimberleycabins.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600">
                Book A Cabin
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors font-medium ${
                    location === item.href 
                      ? 'text-bluebonnet-500' 
                      : 'text-gray-700 hover:text-bluebonnet-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a 
                href="https://wimberleycabins.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="bg-bluebonnet-500 text-white hover:bg-bluebonnet-600 w-full">
                  Book A Cabin
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
