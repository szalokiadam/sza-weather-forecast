import { Stack } from '@mui/material';
import { FC } from 'react';
import { BasicText, colors } from './styles';

const Footer: FC = () => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'12px'}
      sx={{
        marginTop: '20px',
        padding: '20px',
        background: `${colors.white}88`,
      }}
    >
      <BasicText
        sx={{
          color: colors.black,
        }}
      >
        Készítette:
      </BasicText>
      <BasicText
        sx={{
          color: colors.black,
          fontWeight: 800,
        }}
      >
        Szalóki Ádám
      </BasicText>
    </Stack>
  );
};

export default Footer;
