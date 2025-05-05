import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForecast } from '../hooks/useWeather';
import ForecastItem from '../components/ForecastItem';

interface Props {
    city: string;
}

const ForecastContainer: React.FC<Props> = ({ city } ) => {
    const { data, isLoading, error } = useForecast(city);
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Forecast data could not be loaded.</p>;

    return (
        <Row>
            {data.DailyForecasts.map((day: any, index: number) => (
                <Col key={index} sm={6} md={4} lg={2}>
                    <ForecastItem day={day} onClick={() => navigate(`/details/${index}`, { state: day })} />
                </Col>
            ))}
        </Row>
    );
};

export default ForecastContainer;
