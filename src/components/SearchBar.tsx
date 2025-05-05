import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

interface Props {
    onSearch: (city: string) => Promise<void>;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            await onSearch(city.trim());
        }
    };

    return (
        <Col key="searchbox" sm={12} md={8} lg={8}>
        <Form onSubmit={handleSubmit} className="mb-3">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder={t('search_text')}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button type="submit" variant="primary">
                    {t('search_btn_text')}
                </Button>
            </InputGroup>
        </Form>
        </Col>
    );
};

export default SearchBar;