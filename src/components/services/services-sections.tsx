import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export function ServicesHero({ title, subtitle, lang }: ServicesHeroProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated planets */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 blur-[40px]"
        style={{ top: '10%', right: isRtl ? 'auto' : '15%', left: isRtl ? '15%' : 'auto' }}
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-[30px]"
        style={{ bottom: '20%', left: isRtl ? 'auto' : '10%', right: isRtl ? '10%' : 'auto' }}
        animate={{
          y: [0, -15, 0],
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

interface IntroSectionProps {
  title: string;
  description: string;
}

export function IntroSection({ title, description }: IntroSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-gray-300">{description}</p>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  index: number;
  lang: string;
}

function ServiceCard({ title, description, features, icon, index, lang }: ServiceCardProps) {
  const isRtl = lang === 'ar';
  
  // Icons mapping
  const icons = {
    strategy: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    marketing: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
    development: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    research: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    growth: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    analytics: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  };
  
  const selectedIcon = icons[icon as keyof typeof icons] || icons.strategy;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card variant="glass" hover className="h-full">
        <CardContent className="pt-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-500 mb-4">
            {selectedIcon}
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          
          <h4 className="font-semibold text-white mb-3">
            {lang === 'ar' ? 'المميزات:' : 'Features:'}
          </h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-cyan-400 mt-1 mr-2 rtl:ml-2 rtl:mr-0">
                  <FiCheck />
                </span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ServicesListProps {
  services: {
    title: string;
    description: string;
    features: string[];
    icon: string;
  }[];
  lang: string;
}

export function ServicesList({ services, lang }: ServicesListProps) {
  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
  isRtl: boolean;
}

function ProcessStep({ number, title, description, isLast, isRtl }: ProcessStepProps) {
  return (
    <div className="flex">
      {/* Step number and line */}
      <div className="flex flex-col items-center mr-4 rtl:ml-4 rtl:mr-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold">
          {number}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-purple-600/50 my-2"></div>
        )}
      </div>
      
      {/* Step content */}
      <div className="pb-8">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

interface ProcessSectionProps {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
  lang: string;
}

export function ProcessSection({ title, steps, lang }: ProcessSectionProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
          
          <div className="space-y-2">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  index: number;
}

function Testimonial({ quote, author, position, index }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-6 shadow-[0_0_15px_rgba(110,0,255,0.2)]"
    >
      <div className="text-cyan-400 text-4xl mb-4">&quot;</div>
      <p className="text-gray-300 mb-6">{quote}</p>
      <div>
        <p className="font-bold text-white">{author}</p>
        <p className="text-gray-400">{position}</p>
      </div>
    </motion.div>
  );
}

interface TestimonialsSectionProps {
  title: string;
  testimonials: {
    quote: string;
    author: string;
    position: string;
  }[];
}

export function TestimonialsSection({ title, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  lang: string;
}

export function CtaSection({ title, description, buttonText, lang }: CtaSectionProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-8 shadow-[0_0_30px_rgba(0,209,255,0.2)] text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-8">{description}</p>
          
          <Link href={`/${lang}/contact`}>
            <Button size="lg" className="group">
              {buttonText}
              <ArrowIcon className={`ml-2 rtl:mr-2 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
