// contexts/LanguageContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import i18n from '../i18n'; // i18n modülünü içe aktar

type Language = 'en' | 'es';

interface LanguageContextType {
    lang: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    setLanguage: () => {}
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>('en');

    const setLanguage = (newLang: Language) => {
        setLang(newLang);
        i18n.changeLanguage(newLang); // i18next dilini değiştir
    };

    // Sayfa yenilendiğinde doğru dili ayarla
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
