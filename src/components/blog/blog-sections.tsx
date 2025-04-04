'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiCalendar, FiClock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BlogHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export function BlogHero({ title, subtitle, lang }: BlogHeroProps) {
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

interface BlogSearchProps {
  placeholder: string;
  buttonText: string;
  lang: string;
  onSearch: (query: string) => void;
}

export function BlogSearch({ placeholder, buttonText, lang, onSearch }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = lang === 'ar';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <div className="max-w-2xl mx-auto my-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            dir={isRtl ? 'rtl' : 'ltr'}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
        </div>
        <Button type="submit" className="rounded-l-none">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}

interface BlogCategoriesProps {
  categories: {
    [key: string]: string;
  };
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  lang: string;
}

export function BlogCategories({ categories, activeCategory, onCategoryChange, lang }: BlogCategoriesProps) {
  const isRtl = lang === 'ar';
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {Object.entries(categories).map(([key, value]) => (
        <Button
          key={key}
          variant={activeCategory === key ? "default" : "outline"}
          onClick={() => onCategoryChange(key)}
          className="m-1"
        >
          {value}
        </Button>
      ))}
    </div>
  );
}

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorTitle: string;
    date: string;
    readTime: string;
    featured: boolean;
    image: string;
  };
  lang: string;
  index: number;
}

export function BlogPostCard({ post, lang, index }: BlogPostCardProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card variant="glass" hover className="h-full overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
          <div className="absolute inset-0 bg-purple-900/20" />
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.featured && (
            <div className="absolute top-2 right-2 z-10 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {lang === 'ar' ? 'مميز' : 'Featured'}
            </div>
          )}
        </div>
        
        <CardContent className="pt-6">
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <FiCalendar className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <FiClock className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-3">{post.title}</h3>
          <p className="text-gray-300 mb-4">{post.excerpt}</p>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-white">{post.author}</p>
              <p className="text-sm text-gray-400">{post.authorTitle}</p>
            </div>
            
            <Link href={`/${lang}/blog/${post.id}`} className="text-cyan-400 flex items-center hover:text-cyan-300 transition-colors">
              {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              <ArrowIcon className={`ml-1 rtl:mr-1 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface BlogPostsGridProps {
  posts: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorTitle: string;
    date: string;
    readTime: string;
    featured: boolean;
    image: string;
  }[];
  lang: string;
}

export function BlogPostsGrid({ posts, lang }: BlogPostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {posts.map((post, index) => (
        <BlogPostCard key={post.id} post={post} lang={lang} index={index} />
      ))}
    </div>
  );
}

interface BlogPostContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    authorTitle: string;
    date: string;
    readTime: string;
    image: string;
  };
  publishedText: string;
  byText: string;
  backToListText: string;
  lang: string;
}

export function BlogPostContent({ post, publishedText, byText, backToListText, lang }: BlogPostContentProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowRight : FiArrowLeft;
  
  return (
    <article className="max-w-4xl mx-auto px-4">
      <Link href={`/${lang}/blog`} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowIcon className="mr-2 rtl:ml-2 rtl:mr-0" />
        {backToListText}
      </Link>
      
      <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
        <div className="absolute inset-0 bg-purple-900/20" />
        <Image 
          src={post.image} 
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
      
      <div className="flex items-center mb-8 text-gray-300">
        <div>
          <p>
            {publishedText} <span className="text-white">{post.date}</span> {byText} <span className="text-white">{post.author}</span>
          </p>
          <p className="text-sm text-gray-400">{post.authorTitle} • {post.readTime}</p>
        </div>
      </div>
      
      <div 
        className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </article>
  );
}

interface RelatedPostsProps {
  title: string;
  posts: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string;
  }[];
  lang: string;
}

export function RelatedPosts({ title, posts, lang }: RelatedPostsProps) {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? FiArrowLeft : FiArrowRight;
  
  return (
    <section className="py-16 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} variant="glass" hover className="h-full">
              <div className="relative h-40 w-full">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardContent className="pt-4">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                
                <Link href={`/${lang}/blog/${post.id}`} className="text-cyan-400 flex items-center text-sm hover:text-cyan-300 transition-colors">
                  {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                  <ArrowIcon className={`ml-1 rtl:mr-1 rtl:ml-0 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
