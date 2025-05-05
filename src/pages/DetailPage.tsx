import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DetailPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <p>{t('detail.noData')}</p>;

    const currentLang = i18n.language;

    const date = new Date(state.Date).toLocaleDateString(currentLang, {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    const iconCode = state.Day.Icon.toString().padStart(2, '0');
    const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;
    const phrase = t(`weather.${state.Day.IconPhrase}`, { defaultValue: state.Day.IconPhrase });

    return (
        <Card className="p-4 shadow-sm">
            <Card.Title className="text-center fs-3">{date}</Card.Title>
            <div className="text-center">
                <img src={iconUrl} alt={phrase} />
                <h4>{phrase}</h4>
            </div>
            <hr />
            <p><strong>{t('detail.minTemp')}:</strong> {state.Temperature.Minimum.Value}°C</p>
            <p><strong>{t('detail.maxTemp')}:</strong> {state.Temperature.Maximum.Value}°C</p>
            <p><strong>{t('detail.realFeel')}:</strong> {state.RealFeelTemperature?.Minimum?.Value ?? '-'}°C / {state.RealFeelTemperature?.Maximum?.Value ?? '-'}°C</p>
            <p><strong>{t('detail.wind')}:</strong> {state.Day.Wind?.Speed?.Value ?? '-'} km/h {state.Day.Wind?.Direction?.Localized ?? ''}</p>
            <p><strong>{t('detail.rainProb')}:</strong> %{state.Day.RainProbability ?? 0}</p>
            <p><strong>{t('detail.thunderProb')}:</strong> %{state.Day.ThunderstormProbability ?? 0}</p>
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">← {t('detail.back')}</Button>
        </Card>
    );
};

export default DetailPage;
