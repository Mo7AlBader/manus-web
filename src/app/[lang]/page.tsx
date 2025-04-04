import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  HeroSection, 
  IntroSection, 
  ServicesSection, 
  BlogSection, 
  NewsletterSection 
} from '@/components/home/home-sections';
import { type Locale } from '@/lib/i18n/types';

interface HomePageProps {
  params: {
    lang: Locale;
  };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const dictionary = await getDictionary(lang);
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <HeroSection dictionary={dictionary} lang={lang} />
      <IntroSection dictionary={dictionary} lang={lang} />
      <ServicesSection dictionary={dictionary} lang={lang} />
      <BlogSection dictionary={dictionary} lang={lang} />
      <NewsletterSection dictionary={dictionary} lang={lang} />
    </MainLayout>
  );
}
