import CalendarBooking from "@/components/CalendarBooking";

export default function BookingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-white dark:bg-gray-900">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Book Your Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Select a convenient time for your cleaning service. We&apos;ll make sure your space shines!
        </p>
        <CalendarBooking 
          calLink="htclean"
          className="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-4"
        />
      </div>
    </main>
  );
} 