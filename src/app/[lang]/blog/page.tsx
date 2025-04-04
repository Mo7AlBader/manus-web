import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import BlogPageClient from '@/components/blog/blog-page-client';
import { type Locale } from '@/lib/i18n/types';

interface BlogPageProps {
  params: {
    lang: Locale;
  };
}

export default async function BlogPage({ params: { lang } }: BlogPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load blog page specific content
  const blogContent = (await import(`@/lib/i18n/dictionaries/${lang}-blog.json`)).default;
  
  return (
    <BlogPageClient 
      params={{ lang }} 
      dictionary={dictionary} 
      blogContent={blogContent} 
    />
  );
}
