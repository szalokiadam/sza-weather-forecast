import { Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BasicText, colors } from './styles';
import { useMemo } from 'react';
import { useWeatherContext } from './context';
import * as dateFns from 'date-fns';
import { hu } from 'date-fns/locale';

const WeeklyTemperatureChart = () => {
  const { weather } = useWeatherContext();

  const items = useMemo(() => {
    return (
      weather?.daily?.map((w) => ({
        id: w.date,
        day: dateFns.format(new Date(w.date), 'MMMM dd', {
          locale: hu,
        }),
        max: w.maxTemperature,
        min: w.minTemperature,
      })) || []
    );
  }, [weather]);

  return (
    <Stack
      sx={{
        position: 'relative',
        borderRadius: '20px',
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(4px)',
          borderRadius: '20px',
          background: `${colors.black}88`,
        }}
      />
      <Stack
        spacing={2}
        sx={{
          padding: '20px',
          zIndex: 0,
        }}
      >
        <BasicText
          sx={{
            textAlign: 'center',
          }}
        >
          Napi legmagasabb hőmérséklet
        </BasicText>

        <Stack
          sx={{
            background: `${colors.white}AA`,
            borderRadius: '12px',
          }}
        >
          <LineChart
            height={400}
            series={[
              {
                data: items.map((item) => item.max),
                label: 'Max hőmérséklet',
                curve: 'monotoneX',
                showMark: true,
                color: colors.red,
                valueFormatter: (value) => (value ? `${Math.round(value)}°C` : null),
              },
              {
                data: items.map((item) => item.min),
                label: 'Min hőmérséklet',
                curve: 'monotoneX',
                showMark: true,
                color: colors.blue,
                valueFormatter: (value) => (value ? `${Math.round(value)}°C` : null),
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
              left: 30,
              right: 30,
              top: 20,
              bottom: 40,
            }}
            sx={{
              '& .MuiChartsSurface-root': {
                overflow: 'visible',
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WeeklyTemperatureChart;
