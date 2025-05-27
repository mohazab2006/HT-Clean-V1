import CalendarBooking from "@/components/CalendarBooking";

export default function FreeQuotePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-900">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Book Your Free Quote
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Schedule a convenient time for your free consultation. We&apos;ll discuss your needs and provide a detailed quote.
        </p>
        <CalendarBooking 
          calLink="htclean/free-quote"
          className="shadow-lg rounded-lg bg-gray-800 p-4"
        />
      </div>
    </main>
  );
} 