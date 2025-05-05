import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import ForecastContainer from './containers/ForecastContainer';
import { getUserLocation } from './utils/getUserLocation';
import { fetchLocationKeyByCoords } from './services/weatherService';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailPage from './pages/DetailPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { fetchCoordsByCity } from './services/locationService';
import { useLocationInfo } from './hooks/useLocationInfo';
import TopBar from "./components/NavBar.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [city, setCity] = useState('Istanbul');
    const [latitude, setLatitude] = useState(0); // 41.042
    const [longitude, setLongitude] = useState(0); // 28.866

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const pos = await getUserLocation();
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                setLatitude(lat);
                setLongitude(lon);

                const locationData = await fetchLocationKeyByCoords(lat, lon);
                setCity(locationData.LocalizedName);
            } catch (err) {
                console.error('Could not get location, using default city.', err);
            }
        };

        fetchLocation().then(r => r);
    }, []);

    const location = useLocationInfo(`${latitude}, ${longitude}`);

    const handleSearch = async (cityName: string) => {
        try {
            const coords = await fetchCoordsByCity(cityName);
            setLatitude(coords.lat);
            setLongitude(coords.lon);
            setCity(cityName);
        } catch (err) {
            console.error('City not found or API error', err);
        }
    };

    return (
        <ThemeProvider>
            <LanguageProvider>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Container className="py-4">
                            <TopBar />
                            {location ? (
                                <h1 className="mt-5 mb-5">{location.city}, {location.region}, {location.country}</h1>
                            ) : (
                                <p className="mt-5 mb-5">Konum alınıyor...</p>
                            )}
                            <SearchBar onSearch={handleSearch} />
                            <Routes>
                                <Route path="/" element={<ForecastContainer city={city} />} />
                                <Route path="/details/:index" element={<DetailPage />} />
                            </Routes>
                        </Container>
                    </Router>
                </QueryClientProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;