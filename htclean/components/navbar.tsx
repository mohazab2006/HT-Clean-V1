"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isCarDetailing = pathname === "/car-detailing" || pathname.startsWith("/gallery/car-detailing");
  const isWindowCleaning = pathname === "/window-cleaning" || pathname.startsWith("/gallery/window-cleaning");
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Interactive Logo */}
          <Link 
            href="/" 
            className="flex items-center transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            aria-label="HTClean Home"
          >
            <div className="relative h-20 w-20 brightness-125 opacity-95">
              <Image
                src="/logo.svg"
                alt="HTClean Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isCarDetailing && (
              <Link
                href="/window-cleaning"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Switch to Window & Power Washing
              </Link>
            )}
            {isWindowCleaning && (
              <Link
                href="/car-detailing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Switch to Car Detailing
              </Link>
            )}
            {(isCarDetailing || isWindowCleaning) && (
              <>
                <Link
                  href={isCarDetailing ? "/gallery/car-detailing" : "/gallery/window-cleaning"}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Work
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </>
            )}
            <Link
              href="https://cal.com/your-calendar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              target="_blank"
            >
              Schedule Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            {isCarDetailing && (
              <div className="px-2 pt-2 pb-3">
                <Link
                  href="/window-cleaning"
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Switch to Window & Power Washing
                </Link>
              </div>
            )}
            {isWindowCleaning && (
              <div className="px-2 pt-2 pb-3">
                <Link
                  href="/car-detailing"
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Switch to Car Detailing
                </Link>
              </div>
            )}
            {(isCarDetailing || isWindowCleaning) && (
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href={isCarDetailing ? "/gallery/car-detailing" : "/gallery/window-cleaning"}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Our Work
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            )}
            <div className="px-2 pt-2 pb-3">
              <Link
                href="https://cal.com/your-calendar"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                target="_blank"
              >
                Schedule Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 