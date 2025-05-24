import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/ui/CustomCursor";

export default function CarDetailing() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/car-detailing-hero.jpg"
            alt="Professional car detailing"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Professional Car Detailing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Premium detailing services for your vehicle
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="https://cal.com/your-calendar/car-detailing"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
              target="_blank"
            >
              Book Now
            </Link>
            <Link 
              href="#services"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Detailing Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-white">Basic Package</h3>
              <ul className="space-y-3 mb-6 text-gray-300">
                <li>• Exterior wash and dry</li>
                <li>• Wheel cleaning</li>
                <li>• Interior vacuum</li>
                <li>• Dashboard and console cleaning</li>
              </ul>
              <p className="text-2xl font-bold text-white mb-6">From $99</p>
              <Link 
                href="https://cal.com/your-calendar/basic-detailing"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                target="_blank"
              >
                Book Basic Package
              </Link>
            </div>

            {/* Premium Package */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-white">Premium Package</h3>
              <ul className="space-y-3 mb-6 text-gray-300">
                <li>• Everything in Basic</li>
                <li>• Paint decontamination</li>
                <li>• One-step paint correction</li>
                <li>• Ceramic coating (6 months)</li>
                <li>• Leather treatment</li>
              </ul>
              <p className="text-2xl font-bold text-white mb-6">From $249</p>
              <Link 
                href="https://cal.com/your-calendar/premium-detailing"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                target="_blank"
              >
                Book Premium Package
              </Link>
            </div>

            {/* Ultimate Package */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-white">Ultimate Package</h3>
              <ul className="space-y-3 mb-6 text-gray-300">
                <li>• Everything in Premium</li>
                <li>• Two-step paint correction</li>
                <li>• Premium ceramic coating (1 year)</li>
                <li>• Engine bay detailing</li>
                <li>• Paint protection film</li>
              </ul>
              <p className="text-2xl font-bold text-white mb-6">From $499</p>
              <Link 
                href="https://cal.com/your-calendar/ultimate-detailing"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                target="_blank"
              >
                Book Ultimate Package
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 