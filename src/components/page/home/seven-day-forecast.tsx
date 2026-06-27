import { FC } from 'react';
import { Stack, Tooltip } from '@mui/material';
import { useWeatherContext } from './context';
import { BasicText, colors } from './styles';

const SevenDayForecast: FC = () => {
  const { weather } = useWeatherContext();

  return (
    <Stack
      gap={'16px'}
      sx={{
        width: '100%',
      }}
    >
      <BasicText
        sx={{
          fontSize: '18px',
          fontWeight: 500,
        }}
      >
        7 napos előrejelzés
      </BasicText>

      <Stack gap={'8px'}>
        {weather?.daily.map((day) => (
          <Tooltip
            key={day.date}
            title={day.condition}
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '20px',
                },
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={'12px'}
              sx={{
                padding: '12px 16px',
                borderRadius: '100px',
                backgroundColor: `${colors.white}33`,
              }}
            >
              <BasicText
                sx={{
                  fontSize: {
                    xs: '16px',
                    md: '20px',
                  },
                  width: '200px',
                  textTransform: 'capitalize',
                  span: {
                    fontSize: '12px',
                    fontWeight: 400,
                  },
                }}
              >
                {day.dayName} <span>({day.date})</span>
              </BasicText>

              <Stack direction="row" alignItems="center" gap={'8px'}>
                <BasicText
                  sx={{
                    fontSize: '24px',
                  }}
                >
                  {day.icon}
                </BasicText>
                <BasicText
                  sx={{
                    fontSize: {
                      xs: '16px',
                      md: '20px',
                    },
                  }}
                >
                  {day.precipitationProbability}%
                </BasicText>
              </Stack>

              <BasicText
                sx={{
                  fontSize: {
                    xs: '16px',
                    md: '20px',
                  },
                }}
              >
                {Math.round(day.minTemperature)}° / {Math.round(day.maxTemperature)}°
              </BasicText>
            </Stack>
          </Tooltip>
        ))}

        {!weather && <BasicText>Válassz várost az előrejelzéshez.</BasicText>}
      </Stack>
    </Stack>
  );
};

export default SevenDayForecast;
