export type Locale = 'en' | 'ar';

export interface Dictionary {
  navigation: {
    home: string;
    about: string;
    services: string;
    blog: string;
    contact: string;
    newsletter: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    intro: {
      title: string;
      description: string;
    };
    services: {
      title: string;
      description: string;
      viewAll: string;
    };
    blog: {
      title: string;
      description: string;
      readMore: string;
      viewAll: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
      thanks: string;
    };
  };
  footer: {
    rights: string;
    follow: string;
  };
}
