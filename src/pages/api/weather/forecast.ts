import type { NextApiRequest, NextApiResponse } from 'next';
import { getDayName, getWeatherCondition } from './utils';

type OpenMeteoForecastResponse = {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    precipitation_probability_max: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
};

type WeatherForecastResponse = {
  latitude: number;
  longitude: number;
  current: {
    temperature: number;
    weatherCode: number;
    condition: string;
    icon: string;
  };
  daily: {
    date: string;
    dayName: string;
    weatherCode: number;
    condition: string;
    icon: string;
    precipitationProbability: number;
    minTemperature: number;
    maxTemperature: number;
  }[];
  message?: string;
};

const parseNumberQuery = (value: string | string[] | undefined) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherForecastResponse | { message: string }>
) {
  const latitude = parseNumberQuery(req.query.latitude);
  const longitude = parseNumberQuery(req.query.longitude);

  if (latitude === undefined || longitude === undefined) {
    res.status(400).json({ message: 'A latitude és longitude megadása kötelező.' });
    return;
  }

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('current', 'temperature_2m,weather_code');
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
  );
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '7');

  const response = await fetch(url);

  if (!response.ok) {
    res.status(response.status).json({ message: 'Az időjárás lekérése sikertelen.' });
    return;
  }

  const data = (await response.json()) as OpenMeteoForecastResponse;
  const currentCondition = getWeatherCondition(data.current.weather_code);

  res.status(200).json({
    latitude,
    longitude,
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      condition: currentCondition.condition,
      icon: currentCondition.icon,
    },
    daily: data.daily.time.map((date, index) => {
      const weatherCode = data.daily.weather_code[index];
      const dailyCondition = getWeatherCondition(weatherCode);

      return {
        date,
        dayName: getDayName(date),
        weatherCode,
        condition: dailyCondition.condition,
        icon: dailyCondition.icon,
        precipitationProbability: data.daily.precipitation_probability_max[index],
        minTemperature: data.daily.temperature_2m_min[index],
        maxTemperature: data.daily.temperature_2m_max[index],
      };
    }),
  });
}
