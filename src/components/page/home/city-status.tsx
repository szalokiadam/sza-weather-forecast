import { FC } from 'react';
import { Stack } from '@mui/material';
import { useWeatherContext } from './context';
import { BasicText } from './styles';

const CityStatus: FC = () => {
  const { selectedCity, weather, isWeatherLoading, weatherError, openCitySelector } =
    useWeatherContext();

  if (isWeatherLoading) {
    return <BasicText>Időjárás betöltése...</BasicText>;
  }

  if (weatherError) {
    return <BasicText>{weatherError}</BasicText>;
  }

  return (
    <Stack gap={'8px'}>
      <BasicText
        onClick={openCitySelector}
        sx={{
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {selectedCity?.name ?? 'Válassz várost'}
      </BasicText>
      <BasicText
        sx={{
          fontSize: '48px',
        }}
      >
        {weather ? `${Math.round(weather.current.temperature)} °C` : '-- °C'}
      </BasicText>
      <BasicText
        sx={{
          fontSize: '16px',
        }}
      >
        {weather?.current.condition ?? 'Nincs időjárási adat'}
      </BasicText>
    </Stack>
  );
};

export default CityStatus;
