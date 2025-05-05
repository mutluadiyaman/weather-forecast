import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ForecastItemProps {
    day: {
        Date: string;
        Temperature: {
            Minimum: { Value: number };
            Maximum: { Value: number };
        };
        Day: {
            Icon: number;
            IconPhrase: string;
        };
    };
    onClick?: () => void;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ day, onClick }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const dayText = new Date(day.Date).toLocaleDateString(lang, {
        weekday: 'long',
    });

    const date = new Date(day.Date).toLocaleDateString(lang, {
        day: 'numeric',
        month: 'short',
    });

    const minTemp = Math.floor(day.Temperature.Minimum.Value);
    const maxTemp = Math.floor(day.Temperature.Maximum.Value);
    const phraseKey = `weather.${day.Day.IconPhrase}`;
    const phrase = t(phraseKey, day.Day.IconPhrase);

    const iconCode = day.Day.Icon.toString().padStart(2, '0');
    const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;

    return (
        <Card onClick={onClick} className="mb-3 shadow-sm" style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <Card.Body className="text-center">
                <Card.Title>{dayText}</Card.Title><Card.Text>{date}</Card.Text>
                <img src={iconUrl} alt={phrase} />
                <Card.Text>{phrase}</Card.Text>
                <Card.Text>{minTemp}°C / {maxTemp}°C</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ForecastItem;
