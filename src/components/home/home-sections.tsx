'use client';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Dictionary } from '@/lib/i18n/types';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface HeroSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function HeroSection({ dictionary, lang }: HeroSectionProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated planet */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 blur-[60px]"
        style={{ top: '10%', right: isRtl ? 'auto' : '5%', left: isRtl ? '5%' : 'auto' }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {dictionary.home.hero.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {dictionary.home.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href={`/${lang}/services`}>
              <Button size="lg" className="group">
                {dictionary.home.hero.cta}
                <ArrowIcon className={`ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface IntroSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function IntroSection({ dictionary, lang }: IntroSectionProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{dictionary.home.intro.title}</h2>
          <p className="text-lg text-gray-300">{dictionary.home.intro.description}</p>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card variant="glass" hover className="h-full">
        <CardHeader>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-500 mb-4">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ServicesSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function ServicesSection({ dictionary, lang }: ServicesSectionProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  // Sample services - in a real app, these would come from a data source
  const services = [
    {
      title: lang === 'ar' ? 'إدارة المنتجات' : 'Product Management',
      description: lang === 'ar' 
        ? 'تطوير استراتيجيات المنتج وخارطة الطريق لضمان نجاح المنتجات الرقمية'
        : 'Developing product strategies and roadmaps to ensure digital product success',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      title: lang === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing',
      description: lang === 'ar'
        ? 'استراتيجيات تسويقية مبتكرة لزيادة الوعي بالعلامة التجارية وجذب العملاء'
        : 'Innovative marketing strategies to increase brand awareness and attract customers',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
    },
    {
      title: lang === 'ar' ? 'تطوير المنتجات' : 'Product Development',
      description: lang === 'ar'
        ? 'تحويل الأفكار إلى منتجات رقمية قابلة للتطبيق باستخدام أحدث التقنيات'
        : 'Transforming ideas into viable digital products using the latest technologies',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    }
  ];
  
  return (
    <section className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{dictionary.home.services.title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{dictionary.home.services.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href={`/${lang}/services`}>
            <Button variant="outline" className="group">
              {dictionary.home.services.viewAll}
              <ArrowIcon className={`ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface BlogSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function BlogSection({ dictionary, lang }: BlogSectionProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  // Sample blog posts - in a real app, these would come from a data source
  const blogPosts = [
    {
      title: lang === 'ar' ? 'كيفية بناء استراتيجية منتج ناجحة' : 'How to Build a Successful Product Strategy',
      excerpt: lang === 'ar'
        ? 'تعرف على الخطوات الأساسية لبناء استراتيجية منتج تلبي احتياجات المستخدمين وتحقق أهداف العمل'
        : 'Learn the essential steps to building a product strategy that meets user needs and achieves business goals',
      date: new Date(2025, 3, 1),
      slug: 'how-to-build-successful-product-strategy'
    },
    {
      title: lang === 'ar' ? 'اتجاهات التسويق الرقمي لعام 2025' : 'Digital Marketing Trends for 2025',
      excerpt: lang === 'ar'
        ? 'استكشف أحدث اتجاهات التسويق الرقمي التي ستشكل المشهد في عام 2025 وما بعده'
        : 'Explore the latest digital marketing trends that will shape the landscape in 2025 and beyond',
      date: new Date(2025, 2, 15),
      slug: 'digital-marketing-trends-2025'
    }
  ];
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{dictionary.home.blog.title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{dictionary.home.blog.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="default" hover className="h-full">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-400">
                    {new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(post.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="group">
                      {dictionary.home.blog.readMore}
                      <ArrowIcon className={`ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href={`/${lang}/blog`}>
            <Button variant="outline" className="group">
              {dictionary.home.blog.viewAll}
              <ArrowIcon className={`ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface NewsletterSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function NewsletterSection({ dictionary, lang }: NewsletterSectionProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-8 shadow-[0_0_30px_rgba(0,209,255,0.2)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{dictionary.home.newsletter.title}</h2>
            <p className="text-gray-300">{dictionary.home.newsletter.description}</p>
          </div>
          
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder={dictionary.home.newsletter.placeholder}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
            <Button type="submit">
              {dictionary.home.newsletter.button}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
