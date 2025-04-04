import type { Locale } from '../types';
import { cache } from 'react';

// Define supported languages
export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

// Create a dictionary loader with caching
export const getDictionary = cache(async (locale: Locale) => {
  try {
    return (await import(`./dictionaries/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to default locale if requested locale is not available
    return (await import(`./dictionaries/${defaultLocale}.json`)).default;
  }
});

// Helper to determine text direction based on locale
export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

// Helper to get the alternate locale for language switching
export const getAlternateLocale = (locale: Locale): Locale => {
  return locale === 'en' ? 'ar' : 'en';
};
