import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  ContactHero, 
  ContactForm, 
  ContactInfo, 
  FaqSection, 
  CtaSection 
} from '@/components/contact/contact-sections';
import { type Locale } from '@/lib/i18n/types';

interface ContactPageProps {
  params: {
    lang: Locale;
  };
}

export default async function ContactPage({ params: { lang } }: ContactPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load contact page specific content
  const contactContent = (await import(`@/lib/i18n/dictionaries/${lang}-contact.json`)).default;
  const { contact } = contactContent;
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <ContactHero 
        title={contact.title} 
        subtitle={contact.subtitle} 
        lang={lang} 
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row -mx-4">
          <ContactForm 
            formLabels={{
              name: contact.form.name,
              email: contact.form.email,
              subject: contact.form.subject,
              message: contact.form.message,
              submit: contact.form.submit
            }}
            validation={contact.form.validation}
            successMessage={contact.form.success}
            errorMessage={contact.form.error}
            lang={lang}
          />
          
          <ContactInfo 
            title={contact.contactInfo.title}
            description={contact.contactInfo.description}
            contactInfo={contact.contactInfo}
            lang={lang}
          />
        </div>
      </div>
      
      <FaqSection 
        title={contact.faq.title}
        questions={contact.faq.questions}
        lang={lang}
      />
      
      <CtaSection 
        title={contact.cta.title}
        description={contact.cta.description}
        buttonText={contact.cta.button}
        lang={lang}
      />
    </MainLayout>
  );
}
