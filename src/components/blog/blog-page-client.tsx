'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  BlogHero, 
  BlogSearch, 
  BlogCategories, 
  BlogPostsGrid 
} from '@/components/blog/blog-sections';
import { type Locale } from '@/lib/i18n/types';

interface BlogPageProps {
  params: {
    lang: Locale;
  };
  dictionary: any;
  blogContent: any;
}

export default function BlogPageClient({ params: { lang }, dictionary, blogContent }: BlogPageProps) {
  const { blog } = blogContent;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blog.posts);
  
  useEffect(() => {
    let filtered = blog.posts;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((post: any) => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post: any) => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery, blog.posts]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <MainLayout lang={lang} dictionary={dictionary}>
      <BlogHero 
        title={blog.title} 
        subtitle={blog.subtitle} 
        lang={lang} 
      />
      
      <div className="container mx-auto px-4 py-12">
        <BlogSearch 
          placeholder={blog.search.placeholder} 
          buttonText={blog.search.button} 
          lang={lang} 
          onSearch={handleSearch} 
        />
        
        <BlogCategories 
          categories={blog.categories} 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
          lang={lang} 
        />
        
        {filteredPosts.length > 0 ? (
          <BlogPostsGrid posts={filteredPosts} lang={lang} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">{blog.search.noResults}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
