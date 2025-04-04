import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  ServicesHero, 
  IntroSection, 
  ServicesList, 
  ProcessSection, 
  TestimonialsSection, 
  CtaSection 
} from '@/components/services/services-sections';
import { type Locale } from '@/lib/i18n/types';

interface ServicesPageProps {
  params: {
    lang: Locale;
  };
}

export default async function ServicesPage({ params: { lang } }: ServicesPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load services page specific content
  const servicesContent = (await import(`@/lib/i18n/dictionaries/${lang}-services.json`)).default;
  const { services } = servicesContent;
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <ServicesHero 
        title={services.title} 
        subtitle={services.subtitle} 
        lang={lang} 
      />
      <IntroSection 
        title={services.intro.title} 
        description={services.intro.description} 
      />
      <ServicesList 
        services={services.servicesList}
        lang={lang}
      />
      <ProcessSection 
        title={services.process.title} 
        steps={services.process.steps} 
        lang={lang}
      />
      <TestimonialsSection 
        title={services.testimonials.title} 
        testimonials={services.testimonials.items} 
      />
      <CtaSection 
        title={services.cta.title} 
        description={services.cta.description}
        buttonText={services.cta.button} 
        lang={lang} 
      />
    </MainLayout>
  );
}
