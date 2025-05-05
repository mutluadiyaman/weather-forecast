import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.js';
import { useTheme } from '../contexts/ThemeContext.js';

const TopBar: React.FC = () => {
    const { lang, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="d-flex justify-content-end gap-3 p-2">
            <select
                className="form-control w-25"
                value={lang}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
        </div>
    );
};

export default TopBar;
