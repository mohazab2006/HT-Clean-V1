import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/ui/CustomCursor";

export default function WindowCleaning() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/window-cleaning-hero.jpg"
            alt="Professional window cleaning and pressure washing"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Window & Pressure Washing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Professional window cleaning & pressure washing solutions
          </p>
          <div className="flex flex-col gap-4 items-center">
            <Link 
              href="/booking/free-quote"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Book Your Free Quote Today
            </Link>
            <Link 
              href="/gallery/window-cleaning"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Cleaning Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Window Cleaning */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div>
              <h3 className="text-2xl font-bold mb-6 text-white">Window Cleaning</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Residential</h4>
                  <ul className="space-y-3 mb-6 text-gray-300">
                    <li>• Interior and exterior window cleaning</li>
                    <li>• Screen cleaning</li>
                    <li>• Track and sill cleaning</li>
                    <li>• Hard water removal</li>
                  </ul>
                  <p className="text-lg font-bold text-white mb-4">From $149 per home</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Commercial</h4>
                  <ul className="space-y-3 mb-6 text-gray-300">
                    <li>• Regular maintenance programs</li>
                    <li>• High-rise capability</li>
                    <li>• Safety certified technicians</li>
                    <li>• 24/7 emergency services</li>
                  </ul>
                  <p className="text-lg font-bold text-white mb-4">Custom Quote</p>
                </div>
                
                <Link 
                  href="/booking/window-cleaning"
                  className="relative z-10 block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Schedule Window Cleaning
                </Link>
              </div>
            </div>

            {/* Pressure Washing */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div>
              <h3 className="text-2xl font-bold mb-6 text-white">Pressure Washing</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Residential Services</h4>
                  <ul className="space-y-3 mb-6 text-gray-300">
                    <li>• Driveway cleaning</li>
                    <li>• Deck and patio washing</li>
                    <li>• House siding cleaning</li>
                    <li>• Fence restoration</li>
                  </ul>
                  <p className="text-lg font-bold text-white mb-4">From $199 per service</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-white">Commercial Services</h4>
                  <ul className="space-y-3 mb-6 text-gray-300">
                    <li>• Parking lot cleaning</li>
                    <li>• Building exterior washing</li>
                    <li>• Graffiti removal</li>
                    <li>• Regular maintenance contracts</li>
                  </ul>
                  <p className="text-lg font-bold text-white mb-4">Custom Quote</p>
                </div>
                
                <Link 
                  href="/booking/pressure-washing"
                  className="relative z-10 block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Schedule Pressure Washing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 