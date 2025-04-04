import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate random number between min and max
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format date to locale string
export function formatDate(date: Date, locale: string = 'en') {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(date);
}
