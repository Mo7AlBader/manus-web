'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiSend } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContactHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export function ContactHero({ title, subtitle, lang }: ContactHeroProps) {
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

interface ContactFormProps {
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
  validation: {
    required: string;
    email: string;
    minLength: string;
  };
  successMessage: string;
  errorMessage: string;
  lang: string;
}

export function ContactForm({ formLabels, validation, successMessage, errorMessage, lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const isRtl = lang === 'ar';
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) {
      newErrors.name = validation.required;
    }
    
    if (!formData.email) {
      newErrors.email = validation.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = validation.email;
    }
    
    if (!formData.subject) {
      newErrors.subject = validation.required;
    }
    
    if (!formData.message) {
      newErrors.message = validation.required;
    } else if (formData.message.length < 10) {
      newErrors.message = validation.minLength.replace('{0}', '10');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
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
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{successMessage}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="mb-4">
                <label className="block text-white mb-2">{formLabels.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{formLabels.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">{formLabels.subject}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.subject ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-white mb-2">{formLabels.message}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 bg-gray-900/60 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
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
                    {formLabels.submit}
                  </span>
                ) : (
                  formLabels.submit
                )}
              </Button>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ContactInfoProps {
  title: string;
  description: string;
  contactInfo: {
    email: {
      label: string;
      value: string;
    };
    phone: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
    availability: {
      label: string;
      value: string;
    };
  };
  lang: string;
}

export function ContactInfo({ title, description, contactInfo, lang }: ContactInfoProps) {
  const isRtl = lang === 'ar';
  
  const contactItems = [
    { icon: <FiMail className="text-cyan-400" />, label: contactInfo.email.label, value: contactInfo.email.value },
    { icon: <FiPhone className="text-cyan-400" />, label: contactInfo.phone.label, value: contactInfo.phone.value },
    { icon: <FiMapPin className="text-cyan-400" />, label: contactInfo.location.label, value: contactInfo.location.value },
    { icon: <FiClock className="text-cyan-400" />, label: contactInfo.availability.label, value: contactInfo.availability.value },
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
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-8">{description}</p>
          
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <div key={index} className={`flex ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className={`${isRtl ? 'ml-4' : 'mr-4'} mt-1`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{item.label}</h3>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
