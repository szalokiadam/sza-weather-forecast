import { apiClient } from '../client';
import { SearchCitiesResponse, WeatherForecastResponse } from './types';

type GetWeatherForecastParams = {
  latitude: number;
  longitude: number;
};

export const searchCities = (search: string) => {
  return apiClient<SearchCitiesResponse>('/api/weather/search', {
    queryParams: {
      search,
      
    },
  });
};

export const getWeatherForecast = ({
  latitude,
  longitude,
}: GetWeatherForecastParams) => {
  return apiClient<WeatherForecastResponse>('/api/weather/forecast', {
    queryParams: {
      latitude: String(latitude),
      longitude: String(longitude),
    },
  });
};

export * from './types';
