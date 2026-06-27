import { Link, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { BasicText, colors } from './styles';
import * as dateFns from 'date-fns';
import logo from '../../../../public/icons8-sun-240.png';

const formatDate = (date: Date) => {
  return dateFns.format(date, 'yyyy.MM.dd HH:mm');
};

const getMillisecondsUntilNextMinute = () => {
  const now = new Date();

  return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
};

const Header: FC = () => {
  const [currentDate, setCurrentDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      setCurrentDate(formatDate(new Date()));

      intervalId = setInterval(() => {
        setCurrentDate(formatDate(new Date()));
      }, 60 * 1000);
    }, getMillisecondsUntilNextMinute());

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: '8px 40px',
        background: `${colors.white}DD`,
      }}
    >
      <Link
        underline="none"
        href="/"
        sx={{
          display: 'flex',
          flexFlow: 'row',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <img
          src={logo.src}
          style={{
            width: '52px',
          }}
        />
        <BasicText
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            color: colors.black,
          }}
        >
          Időjárás előrejezés
        </BasicText>
      </Link>
      <BasicText
        sx={{
          color: colors.black,
          fontWeight: 700,
        }}
      >
        {currentDate}
      </BasicText>
    </Stack>
  );
};

export default Header;
