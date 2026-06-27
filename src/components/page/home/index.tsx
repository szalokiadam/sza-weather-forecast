import { FC } from 'react';
import { Stack } from '@mui/material';
import { BasicText, colors } from './styles';
import CityStatus from './city-status';

const HomePage: FC = () => {
  return (
    <Stack
      sx={{
        background: `linear-gradient(180deg, ${colors.lightBlue1} 0%, ${colors.lightBlue2} 100%)`,
        width: '100%',
        height: '100vh',
      }}
    >
      <BasicText>Kezdolap</BasicText>
      <Stack
        sx={{
          padding: '80px 40px',
        }}
      >
        <CityStatus />
      </Stack>
    </Stack>
  );
};

export default HomePage;
