import { FC } from 'react';
import { Stack } from '@mui/material';
import { colors } from './styles';
import CityStatus from './city-status';
import CitySelectorModal from './city-selector-modal';
import SevenDayForecast from './seven-day-forecast';
import Footer from './footer';
import { useWeatherContext } from './context';
import Header from './header';
import WeeklyTemperatureChart from './weekly-temperature-chart';

const HomePage: FC = () => {
  const { selectedCity } = useWeatherContext();
  return (
    <Stack
      sx={{
        background: `linear-gradient(180deg, ${colors.lightBlue1} 0%, ${colors.lightBlue2} 100%)`,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Stack
        sx={{
          padding: '80px 40px',

          opacity: selectedCity?.id ? 1 : 0,
          visibility: selectedCity ? 'visible' : 'hidden',
          transition: 'all 1s ease',
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{
            alignItems: {
              xs: 'flex-start',
              md: 'flex-start',
            },
            justifyContent: 'center',
            gap: {
              xs: '40px',
              md: '80px',
            },
          }}
        >
          <CityStatus />
          <Stack
            sx={{
              width: '100%',
              maxWidth: {
                xs: 'none',
                md: '600px',
              },
              gap: {
                xs: '12px',
                md: '40px',
              },
            }}
          >
            <SevenDayForecast />
            <WeeklyTemperatureChart />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          opacity: selectedCity?.id ? 1 : 0,
          visibility: selectedCity ? 'visible' : 'hidden',
          transition: 'all 1s ease',
        }}
      >
        <Footer />
      </Stack>
      <CitySelectorModal />
    </Stack>
  );
};

export default HomePage;
