'use client';
import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  AboutHero, 
  Biography, 
  Skills, 
  Experience, 
  Education, 
  Certifications, 
  CtaSection 
} from '@/components/about/about-sections';
import { type Locale } from '@/lib/i18n/types';

interface AboutPageProps {
  params: {
    lang: Locale;
  };
}

export default async function AboutPage({ params: { lang } }: AboutPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load about page specific content
  const aboutContent = (await import(`@/lib/i18n/dictionaries/${lang}-about.json`)).default;
  const { about } = aboutContent;
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <AboutHero 
        title={about.title} 
        subtitle={about.subtitle} 
        lang={lang} 
      />
      <Biography 
        title={about.bio.title} 
        content={about.bio.content} 
      />
      <Skills 
        title={about.skills.title}
        product={about.skills.product}
        marketing={about.skills.marketing}
        technical={about.skills.technical}
      />
      <Experience 
        title={about.experience.title} 
        jobs={about.experience.jobs} 
        lang={lang}
      />
      <Education 
        title={about.education.title} 
        degrees={about.education.degrees} 
      />
      <Certifications 
        title={about.certifications.title} 
        items={about.certifications.items} 
      />
      <CtaSection 
        title={about.cta.title} 
        buttonText={about.cta.button} 
        lang={lang} 
      />
    </MainLayout>
  );
}
