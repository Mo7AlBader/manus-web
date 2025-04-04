import { type ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { LanguageLayout } from './language-layout';
import { SpaceEffects } from '../shared/space-effects';
import { type Dictionary, type Locale } from '@/lib/i18n/types';

interface MainLayoutProps {
  children: ReactNode;
  lang: Locale;
  dictionary: Dictionary;
}

export function MainLayout({ children, lang, dictionary }: MainLayoutProps) {
  return (
    <LanguageLayout lang={lang}>
      <SpaceEffects density="high" className="min-h-screen bg-gray-950 text-white">
        <Header lang={lang} dictionary={dictionary} />
        <main className="pt-20">
          {children}
        </main>
        <Footer lang={lang} dictionary={dictionary} />
      </SpaceEffects>
    </LanguageLayout>
  );
}
