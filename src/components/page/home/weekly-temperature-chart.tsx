import { Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BasicText, colors } from './styles';
import { useMemo } from 'react';
import { useWeatherContext } from './context';
import * as dateFns from 'date-fns';
import { hu } from 'date-fns/locale';

const items = [
  { day: '06-13', temp: 33 },
  { day: '06-14', temp: 31 },
  { day: '06-15', temp: 28 },
  { day: '06-16', temp: 30 },
  { day: '06-17', temp: 34 },
  { day: '06-18', temp: 32 },
  { day: '06-19', temp: 29 },
];

const WeeklyTemperatureChart = () => {
  const { weather } = useWeatherContext();

  const items = useMemo(() => {
    return (
      weather?.daily?.map((w) => ({
        id: w.date,
        day: dateFns.format(new Date(w.date), 'MMMM dd', {
          locale: hu,
        }),
        temp: w.maxTemperature,
      })) || []
    );
  }, [weather]);

  return (
    <Stack spacing={2}>
      <BasicText
        sx={{
          textAlign: 'center',
        }}
      >
        Napi legmagasabb hőmérséklet
      </BasicText>

      <Stack
        sx={{
          background: `${colors.white}33`,
          borderRadius: '12px',
        }}
      >
        <LineChart
          height={400}
          series={[
            {
              data: items.map((item) => item.temp),
              label: 'Hőmérséklet',
              curve: 'monotoneX',
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: items.map((item) => item.day),
              label: 'Nap',
            },
          ]}
          yAxis={[
            {
              label: 'Hőmérséklet (°C)',
            },
          ]}
          grid={{ horizontal: true }}
          margin={{
            left: 60,
            right: 20,
            top: 20,
            bottom: 40,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default WeeklyTemperatureChart;
