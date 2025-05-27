"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalendarBookingProps {
  className?: string;
  calLink: string;
  style?: React.CSSProperties;
  config?: {
    theme?: "dark" | "light";
    layout?: "month_view" | "week_view" | "column_view";
    name?: string;
    email?: string;
    notes?: string;
    guests?: string[];
    metadata?: Record<string, string>;
  };
}

export default function CalendarBooking({
  className, 
  calLink,
  style = { width: "100%", height: "100%", overflow: "scroll" },
  config = {
    theme: "dark",
    layout: "column_view"
  }
}: CalendarBookingProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal?.('init', {
        debug: process.env.NODE_ENV === 'development',
        calOrigin: 'https://cal.com'
      });
    })();
  }, []);

  // Convert the config to match Cal.com's expected format
  const calConfig = {
    ...config,
    // Only include metadata if it exists
    ...(config.metadata && {
      metadata: Object.entries(config.metadata).reduce((acc, [key, value]) => ({
        ...acc,
        [`metadata[${key}]`]: value
      }), {})
    })
  };

  return (
    <div className={`w-full min-h-[600px] ${className}`}>
      <Cal
        calLink={calLink}
        style={style}
        config={calConfig}
      />
    </div>
  );
} 