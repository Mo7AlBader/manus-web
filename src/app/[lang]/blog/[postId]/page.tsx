'use client';
import { getDictionary } from '@/lib/i18n/utils';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  BlogPostContent,
  RelatedPosts
} from '@/components/blog/blog-sections';
import { type Locale } from '@/lib/i18n/types';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    lang: Locale;
    postId: string;
  };
}

export default async function BlogPostPage({ params: { lang, postId } }: BlogPostPageProps) {
  const dictionary = await getDictionary(lang);
  
  // Load blog page specific content
  const blogContent = (await import(`@/lib/i18n/dictionaries/${lang}-blog.json`)).default;
  const { blog } = blogContent;
  
  // Find the current post
  const post = blog.posts.find((p: any) => p.id === postId);
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  // Find related posts (same category, excluding current post)
  const relatedPosts = blog.posts
    .filter((p: any) => p.category === post.category && p.id !== postId)
    .slice(0, 3);
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <div className="container mx-auto px-4 py-12">
        <BlogPostContent 
          post={post}
          publishedOn={blog.publishedOn}
          byText={blog.by}
          backToListText={blog.backToList}
          lang={lang}
        />
        
        {relatedPosts.length > 0 && (
          <RelatedPosts 
            title={blog.relatedPosts}
            posts={relatedPosts}
            lang={lang}
          />
        )}
      </div>
    </MainLayout>
  );
}
