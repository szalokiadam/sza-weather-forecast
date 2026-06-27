import { createContext, createElement, FC, ReactNode, useContext, useState } from 'react';

type WeatherContextValue = {
  cityId: string;
  setCityId: (cityId: string) => void;
  city: string;
  setCity: (city: string) => void;
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherProvider: FC<WeatherProviderProps> = ({ children }) => {
  const [cityId, setCityId] = useState('');
  const [city, setCity] = useState('');

  return createElement(
    WeatherContext.Provider,
    { value: { cityId, setCityId, city, setCity } },
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
