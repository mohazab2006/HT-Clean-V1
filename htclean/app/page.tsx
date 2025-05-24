import Link from "next/link";
import Image from "next/image";
import DotBackground from "@/components/dot-background";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Dot Background */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <DotBackground />
        <div className="relative z-30 text-center px-4 mb-16 animate-fade-in">
          <span className="block text-blue-400 text-base md:text-lg mb-3 font-medium tracking-wide">
            WELCOME TO HTCLEAN
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Premium Cleaning
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Professional solutions crafted for your vehicle & property
          </p>
        </div>

        {/* Scroll Arrow */}
        <div className="absolute bottom-8 w-full flex justify-center z-30">
          <a 
            href="#services"
            className="animate-bounce cursor-pointer hover:text-blue-400 transition-colors"
            aria-label="Scroll to services"
          >
            <svg 
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Services Selection Section */}
      <section id="services" className="relative min-h-screen flex justify-center w-full scroll-mt-16">
        {/* Car Detailing Side */}
        <Link 
          href="/car-detailing"
          className="group relative w-1/2 h-screen overflow-hidden transition-all duration-500 ease-out hover:w-[55%]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90 z-10 transition-opacity duration-500 group-hover:opacity-80" />
          <Image
            src="/car-detailing-hero.jpg"
            alt="Car Detailing Services"
            fill
            className="object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center transition-transform duration-500 transform group-hover:scale-105">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                Car Detailing
              </h2>
              <p className="font-light text-lg md:text-xl text-gray-200 drop-shadow-lg max-w-md mx-auto">
                Premium auto detailing services for vehicles of all types
              </p>
              <span className="inline-flex items-center text-blue-400 mt-6 font-medium">
                Explore Services
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Window & Power Washing Side */}
        <Link 
          href="/window-cleaning"
          className="group relative w-1/2 h-screen overflow-hidden transition-all duration-500 ease-out hover:w-[55%]"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-slate-900/90 to-blue-900/90 z-10 transition-opacity duration-500 group-hover:opacity-80" />
          <Image
            src="/window-cleaning-hero.jpg"
            alt="Window Cleaning and Power Washing Services"
            fill
            className="object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center transition-transform duration-500 transform group-hover:scale-105">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                Window & Power
                <span className="block mt-2">Washing</span>
              </h2>
              <p className="font-light text-lg md:text-xl text-gray-200 drop-shadow-lg max-w-md mx-auto">
                Professional cleaning solutions for your property
              </p>
              <span className="inline-flex items-center text-blue-400 mt-6 font-medium">
                Explore Services
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
