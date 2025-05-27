import CalendarBooking from "@/components/CalendarBooking";

export default function InteriorBookingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-900">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Book Interior Deep Clean Package
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Schedule your Interior Deep Clean service. Our thorough interior detailing will restore your car&apos;s cabin to pristine condition.
        </p>
        <CalendarBooking 
          calLink="htclean/interior-package"
          className="shadow-lg rounded-lg bg-gray-800 p-4"
        />
      </div>
    </main>
  );
} 