export type CitySearchResult = {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type SearchCitiesResponse = {
  results: CitySearchResult[];
};

export type CurrentWeather = {
  temperature: number;
  weatherCode: number;
  condition: string;
  icon: string;
};

export type DailyForecast = {
  date: string;
  dayName: string;
  weatherCode: number;
  condition: string;
  icon: string;
  precipitationProbability: number;
  minTemperature: number;
  maxTemperature: number;
};

export type WeatherForecastResponse = {
  latitude: number;
  longitude: number;
  current: CurrentWeather;
  daily: DailyForecast[];
};
