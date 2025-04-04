import { i18n } from '@/i18n-config';

// Language switcher component to toggle between languages
export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const isArabic = currentLang === 'ar';
  const targetLang = isArabic ? 'en' : 'ar';
  
  // Get the current path without the language prefix
  const getPathWithoutLang = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const pathParts = path.split('/');
      
      // Remove the language part (index 1)
      if (pathParts.length > 1 && i18n.locales.includes(pathParts[1] as any)) {
        pathParts.splice(1, 1);
      }
      
      return pathParts.join('/') || '/';
    }
    return '/';
  };
  
  const switchLanguage = () => {
    const pathWithoutLang = getPathWithoutLang();
    const newPath = `/${targetLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    window.location.href = newPath;
  };
  
  return (
    <button 
      onClick={switchLanguage}
      className="flex items-center justify-center px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="text-sm font-medium">
        {isArabic ? 'English' : 'العربية'}
      </span>
    </button>
  );
}
