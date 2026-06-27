import { FC } from 'react';
import { Button, Stack } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useWeatherContext } from './context';
import { BasicText, colors } from './styles';

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
    <Stack
      gap={'8px'}
      sx={{
        background: `${colors.black}88`,
        padding: '12px',
        borderRadius: '20px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Button
        variant="text"
        onClick={openCitySelector}
        sx={{
          fontFamily: 'Inter',
          fontSize: '20px',
          fontWeight: 400,
          color: colors.white,
          padding: '4px 8px',
          textTransform: 'none',
          visibility: 'visible',
          opacity: 1,
          transition: 'all 1s ease',
          textAlign: 'left',
          justifyContent: 'flex-start',
          borderRadius: '100px',

          '&:not(&:hover) .MuiButton-icon ': {
            visibility: 'hidden',
            opacity: 0,
          },
        }}
        endIcon={<EditIcon />}
      >
        {selectedCity?.name ?? 'Válassz várost'}
      </Button>
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
