import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
    const { lang, setLanguage } = useLanguage();

    return (
        <div className="mb-3 text-end">
            <select value={lang} onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}>
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
    );
};
