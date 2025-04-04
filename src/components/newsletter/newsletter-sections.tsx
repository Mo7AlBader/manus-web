'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar, FiBookOpen, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NewsletterHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export function NewsletterHero({ title, subtitle, lang }: NewsletterHeroProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated space elements */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 blur-[60px]"
        style={{ top: '5%', right: isRtl ? 'auto' : '10%', left: isRtl ? '10%' : 'auto' }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-[40px]"
        style={{ bottom: '10%', left: isRtl ? 'auto' : '15%', right: isRtl ? '15%' : 'auto' }}
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

interface SubscriptionFormProps {
  formData: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    interestsLabel: string;
    interests: {
      [key: string]: string;
    };
    privacyText: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    validation: {
      required: string;
      email: string;
    };
  };
  lang: string;
}

export function SubscriptionForm({ formData, lang }: SubscriptionFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interests: [] as string[]
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const isRtl = lang === 'ar';
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formState.name) {
      newErrors.name = formData.validation.required;
    }
    
    if (!formState.email) {
      newErrors.email = formData.validation.required;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = formData.validation.email;
    }
    
    if (formState.interests.length === 0) {
      newErrors.interests = formData.validation.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleInterestChange = (interest: string) => {
    setFormState(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests: newInterests };
    });
    
    // Clear error when user selects an interest
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormState({
          name: '',
          email: '',
          interests: []
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2 p-4"
    >
      <Card variant="glass" className="overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
          <p className="text-gray-300 mb-6">{formData.description}</p>
          
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{formData.successMessage}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="mb-4">
                <label className="block text-white mb-2">{formData.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{formData.emailLabel}</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-white mb-2">{formData.interestsLabel}</label>
                <div className="space-y-2">
                  {Object.entries(formData.interests).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        checked={formState.interests.includes(key)}
                        onChange={() => handleInterestChange(key)}
                        className="w-4 h-4 text-purple-600 border-gray-700 rounded focus:ring-purple-500 bg-gray-900"
                      />
                      <label htmlFor={key} className="ml-2 rtl:mr-2 rtl:ml-0 text-gray-300">
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
              </div>
              
              <p className="text-gray-400 text-sm mb-6">{formData.privacyText}</p>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {formData.submitButton}
                  </span>
                ) : (
                  formData.submitButton
                )}
              </Button>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center mt-4">{formData.errorMessage}</p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function BenefitItem({ icon, title, description, index }: BenefitItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-4"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}

interface BenefitsSectionProps {
  title: string;
  benefits: {
    title: string;
    description: string;
  }[];
}

export function BenefitsSection({ title, benefits }: BenefitsSectionProps) {
  const icons = [
    <FiStar key="star" />,
    <FiBookOpen key="book" />,
    <FiCheck key="check" />,
    <FiUsers key="users" />
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full lg:w-1/2 p-4"
    >
      <Card variant="glass" className="h-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                icon={icons[index % icons.length]}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface LatestIssueSectionProps {
  title: string;
  excerpt: string;
  buttonText: string;
  lang: string;
}

export function LatestIssueSection({ title, excerpt, buttonText, lang }: LatestIssueSectionProps) {
  const isRtl = lang === 'ar';
  
  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-8 shadow-[0_0_15px_rgba(110,0,255,0.2)]">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-6">{excerpt}</p>
          
          <Button>
            {buttonText}
          </Button>
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

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  lang: string;
}

function FaqItem({ question, answer, isOpen, toggleOpen, lang }: FaqItemProps) {
  const isRtl = lang === 'ar';
  
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        className={`w-full py-4 flex items-center justify-between text-left ${isRtl ? 'flex-row-reverse' : ''}`}
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      
      {isOpen && (
        <div className="pb-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

interface FaqSectionProps {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
  lang: string;
}

export function FaqSection({ title, questions, lang }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        
        <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-6 shadow-[0_0_15px_rgba(110,0,255,0.2)]">
          {questions.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFaq(index)}
              lang={lang}
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
  
  return (
    <section className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-lg p-8 shadow-[0_0_30px_rgba(0,209,255,0.2)] text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-8">{description}</p>
          
          <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
