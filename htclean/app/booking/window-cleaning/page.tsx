import CalendarBooking from "@/components/CalendarBooking";

export default function WindowCleaningBookingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-900">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Book Window Cleaning Service
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Schedule your professional window cleaning service. We&apos;ll make your windows sparkle inside and out.
        </p>
        <CalendarBooking 
          calLink="htclean/window-cleaning"
          className="shadow-lg rounded-lg bg-gray-800 p-4"
        />
      </div>
    </main>
  );
} 