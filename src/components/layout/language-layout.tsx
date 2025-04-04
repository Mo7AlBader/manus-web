import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { type Locale } from '@/lib/i18n/types';
import { getDirection } from '@/lib/i18n/utils';

interface LayoutProps {
  children: ReactNode;
  lang: Locale;
  className?: string;
}

export function LanguageLayout({ children, lang, className }: LayoutProps) {
  const dir = getDirection(lang);
  
  return (
    <div 
      dir={dir} 
      lang={lang}
      className={cn(
        'min-h-screen font-sans antialiased',
        dir === 'rtl' ? 'font-tajawal' : 'font-inter',
        className
      )}
    >
      {children}
    </div>
  );
}
