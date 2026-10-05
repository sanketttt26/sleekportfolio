import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Server components only: tailwind-merge is ~9 KB gz, so client components use clsx directly.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    // dates are stored in UTC; format them there so the server's time zone can't shift the day
    timeZone: "UTC",
  });
}
