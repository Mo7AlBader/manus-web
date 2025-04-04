import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface AboutHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export function AboutHero({ title, subtitle, lang }: AboutHeroProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated planet */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 blur-[50px]"
        style={{ top: '15%', right: isRtl ? 'auto' : '10%', left: isRtl ? '10%' : 'auto' }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
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

interface BiographyProps {
  title: string;
  content: string;
}

export function Biography({ title, content }: BiographyProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          <div className="text-gray-300 space-y-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  title: string;
  items: string[];
  icon: ReactNode;
  delay?: number;
}

function SkillCategory({ title, items, icon, delay = 0 }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card variant="glass" className="h-full">
        <CardContent className="pt-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-500 mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface SkillsProps {
  title: string;
  product: {
    title: string;
    items: string[];
  };
  marketing: {
    title: string;
    items: string[];
  };
  technical: {
    title: string;
    items: string[];
  };
}

export function Skills({ title, product, marketing, technical }: SkillsProps) {
  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCategory 
            title={product.title} 
            items={product.items} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            delay={0.1}
          />
          <SkillCategory 
            title={marketing.title} 
            items={marketing.items} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>}
            delay={0.2}
          />
          <SkillCategory 
            title={technical.title} 
            items={technical.items} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

interface JobProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isRtl: boolean;
}

function Job({ title, company, period, description, isRtl }: JobProps) {
  return (
    <div className="relative pl-8 rtl:pr-8 rtl:pl-0 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-0 rtl:right-0 rtl:left-auto w-px bg-purple-600/50"></div>
      
      {/* Timeline dot */}
      <div className="absolute top-0 left-0 rtl:right-0 rtl:left-auto w-6 h-6 -ml-3 rtl:ml-0 rtl:-mr-3 rounded-full border-2 border-purple-600 bg-gray-900"></div>
      
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
          <span className="text-cyan-400">{company}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{period}</span>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

interface ExperienceProps {
  title: string;
  jobs: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  lang: string;
}

export function Experience({ title, jobs, lang }: ExperienceProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{title}</h2>
          
          <div className="relative">
            {jobs.map((job, index) => (
              <Job
                key={index}
                title={job.title}
                company={job.company}
                period={job.period}
                description={job.description}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface EducationProps {
  title: string;
  degrees: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export function Education({ title, degrees }: EducationProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          
          <div className="space-y-6">
            {degrees.map((degree, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{degree.degree}</h3>
                  <p className="text-gray-300">{degree.institution}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded">
                    {degree.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CertificationProps {
  name: string;
  issuer: string;
  year: string;
}

function Certification({ name, issuer, year }: CertificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col p-4 border border-gray-800 rounded-lg hover:border-purple-600/50 transition-colors"
    >
      <h3 className="text-lg font-bold">{name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-400">{issuer}</span>
        <span className="text-cyan-400">{year}</span>
      </div>
    </motion.div>
  );
}

interface CertificationsProps {
  title: string;
  items: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

export function Certifications({ title, items }: CertificationsProps) {
  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((cert, index) => (
              <Certification
                key={index}
                name={cert.name}
                issuer={cert.issuer}
                year={cert.year}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CtaSectionProps {
  title: string;
  buttonText: string;
  lang: string;
}

export function CtaSection({ title, buttonText, lang }: CtaSectionProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
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
