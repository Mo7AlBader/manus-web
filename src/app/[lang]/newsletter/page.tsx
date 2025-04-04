import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  NewsletterHero, 
  SubscriptionForm, 
  BenefitsSection, 
  LatestIssueSection, 
  TestimonialsSection, 
  FaqSection, 
  CtaSection 
} from '@/components/newsletter/newsletter-sections';
import { type Locale } from '@/lib/i18n/types';

interface NewsletterPageProps {
  params: {
    lang: Locale;
  };
}

export default async function NewsletterPage({ params: { lang } }: NewsletterPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load newsletter page specific content
  const newsletterContent = (await import(`@/lib/i18n/dictionaries/${lang}-newsletter.json`)).default;
  const { newsletter } = newsletterContent;
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <NewsletterHero 
        title={newsletter.title} 
        subtitle={newsletter.subtitle} 
        lang={lang} 
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row -mx-4">
          <SubscriptionForm 
            formData={newsletter.form}
            lang={lang}
          />
          
          <BenefitsSection 
            title={newsletter.benefits.title}
            benefits={newsletter.benefits.items}
          />
        </div>
      </div>
      
      <LatestIssueSection 
        title={newsletter.latestIssue.title}
        excerpt={newsletter.latestIssue.excerpt}
        buttonText={newsletter.latestIssue.readMoreButton}
        lang={lang}
      />
      
      <TestimonialsSection 
        title={newsletter.testimonials.title}
        testimonials={newsletter.testimonials.items}
      />
      
      <FaqSection 
        title={newsletter.faq.title}
        questions={newsletter.faq.questions}
        lang={lang}
      />
      
      <CtaSection 
        title={newsletter.cta.title}
        description={newsletter.cta.description}
        buttonText={newsletter.cta.button}
        lang={lang}
      />
    </MainLayout>
  );
}
