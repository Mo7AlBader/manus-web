import { type ReactNode } from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { type Dictionary, type Locale } from '@/lib/i18n/types';
import { cn } from '@/lib/utils';

interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
  className?: string;
}

export function Footer({ lang, dictionary, className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isRtl = lang === 'ar';
  
  const socialLinks = [
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className={cn(
      'bg-gray-900/80 border-t border-gray-800/50 py-12',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href={`/${lang}`} className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              {lang === 'ar' 
                ? 'متخصص في إدارة المنتجات والتسويق الرقمي، أساعد الشركات في بناء منتجات رقمية ناجحة.'
                : 'Specializing in product management and digital marketing, helping businesses build successful digital products.'}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.navigation.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.navigation.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.navigation.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {dictionary.navigation.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">
              {dictionary.footer.follow}
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {currentYear} Portfolio. {dictionary.footer.rights}.</p>
        </div>
      </div>
    </footer>
  );
}
