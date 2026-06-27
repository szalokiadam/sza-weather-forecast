import {
  createContext,
  createElement,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CitySearchResult, getWeatherForecast, WeatherForecastResponse } from '@/api/weather';

const SELECTED_CITY_STORAGE_KEY = 'sza-weather-selected-city';

type WeatherContextValue = {
  selectedCity?: CitySearchResult;
  setSelectedCity: (city: CitySearchResult | undefined) => void;
  weather?: WeatherForecastResponse;
  setWeather: (weather: WeatherForecastResponse | undefined) => void;
  isWeatherLoading: boolean;
  weatherError?: string;
  isCitySelectorOpen: boolean;
  openCitySelector: () => void;
  closeCitySelector: () => void;
  loadWeather: (city: CitySearchResult) => Promise<void>;
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherProvider: FC<WeatherProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<CitySearchResult>();
  const [weather, setWeather] = useState<WeatherForecastResponse>();
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string>();
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);

  const openCitySelector = useCallback(() => {
    setIsCitySelectorOpen(true);
  }, []);

  const closeCitySelector = useCallback(() => {
    setIsCitySelectorOpen(false);
  }, []);

  const loadWeather = useCallback(async (cityData: CitySearchResult) => {
    setSelectedCity(cityData);
    localStorage.setItem(SELECTED_CITY_STORAGE_KEY, JSON.stringify(cityData));
    setIsWeatherLoading(true);
    setWeatherError(undefined);

    try {
      const weatherForecast = await getWeatherForecast({
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      });

      setWeather(weatherForecast);
      setIsCitySelectorOpen(false);
    } catch {
      setWeatherError('Nem sikerült lekérni az időjárási adatokat.');
    } finally {
      setIsWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedCity = localStorage.getItem(SELECTED_CITY_STORAGE_KEY);

    if (!storedCity) {
      void Promise.resolve().then(() => setIsCitySelectorOpen(true));
      return;
    }

    try {
      const parsedCity = JSON.parse(storedCity) as CitySearchResult;

      void Promise.resolve().then(() => loadWeather(parsedCity));
    } catch {
      localStorage.removeItem(SELECTED_CITY_STORAGE_KEY);
    }
  }, [loadWeather]);

  return createElement(
    WeatherContext.Provider,
    {
      value: {
        selectedCity,
        setSelectedCity,
        weather,
        setWeather,
        isWeatherLoading,
        weatherError,
        isCitySelectorOpen,
        openCitySelector,
        closeCitySelector,
        loadWeather,
      },
    },
    children
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }

  return context;
};
