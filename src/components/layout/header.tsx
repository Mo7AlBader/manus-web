'use client';
import { type ReactNode } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Dictionary, type Locale } from '@/lib/i18n/types';
import { getAlternateLocale } from '@/lib/i18n/utils';
import { cn } from '@/lib/utils';

interface HeaderProps {
  lang: Locale;
  dictionary: Dictionary;
  className?: string;
}

export function Header({ lang, dictionary, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const alternateLocale = getAlternateLocale(lang);
  const isRtl = lang === 'ar';
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { key: 'home', href: `/${lang}` },
    { key: 'about', href: `/${lang}/about` },
    { key: 'services', href: `/${lang}/services` },
    { key: 'blog', href: `/${lang}/blog` },
    { key: 'contact', href: `/${lang}/contact` },
    { key: 'newsletter', href: `/${lang}/newsletter` },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50',
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {dictionary.navigation[item.key as keyof typeof dictionary.navigation]}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <Link
              href={`/${alternateLocale}`}
              className="px-3 py-1 border border-purple-600/50 rounded text-purple-400 hover:bg-purple-600/10 transition-colors"
            >
              {alternateLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-900 border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {dictionary.navigation[item.key as keyof typeof dictionary.navigation]}
                  </Link>
                ))}
                
                {/* Language Switcher */}
                <Link
                  href={`/${alternateLocale}`}
                  className="px-3 py-1 border border-purple-600/50 rounded text-purple-400 hover:bg-purple-600/10 transition-colors self-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {alternateLocale === 'ar' ? 'العربية' : 'English'}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
