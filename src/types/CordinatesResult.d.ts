export interface City {
    name: string;
    local_names: {
        [languageCode: string]: string;
    };
    lat: number;
    lon: number;
    country: string;
}