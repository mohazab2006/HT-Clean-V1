import CalendarBooking from "@/components/CalendarBooking";

export default function InteriorExteriorBookingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-900">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Book Full Interior/Exterior Detail Package
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Schedule your complete car detailing service. Experience a comprehensive transformation of your vehicle inside and out.
        </p>
        <CalendarBooking 
          calLink="htclean/interior-exterior-package"
          className="shadow-lg rounded-lg bg-gray-800 p-4"
        />
      </div>
    </main>
  );
} 