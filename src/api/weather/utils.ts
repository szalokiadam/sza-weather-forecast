export const getWeatherCondition = (weatherCode: number) => {
  const weatherConditions: Record<number, { condition: string; icon: string }> = {
    0: { condition: 'Tiszta idő', icon: '☀️' },
    1: { condition: 'Többnyire tiszta', icon: '🌤️' },
    2: { condition: 'Részben felhős', icon: '⛅' },
    3: { condition: 'Borult', icon: '☁️' },
    45: { condition: 'Köd', icon: '🌫️' },
    48: { condition: 'Zúzmarás köd', icon: '🌫️' },
    51: { condition: 'Gyenge szitálás', icon: '🌦️' },
    53: { condition: 'Szitálás', icon: '🌦️' },
    55: { condition: 'Erős szitálás', icon: '🌧️' },
    56: { condition: 'Gyenge ónos szitálás', icon: '🌧️' },
    57: { condition: 'Ónos szitálás', icon: '🌧️' },
    61: { condition: 'Gyenge eső', icon: '🌧️' },
    63: { condition: 'Eső', icon: '🌧️' },
    65: { condition: 'Erős eső', icon: '🌧️' },
    66: { condition: 'Gyenge ónos eső', icon: '🌧️' },
    67: { condition: 'Ónos eső', icon: '🌧️' },
    71: { condition: 'Gyenge havazás', icon: '🌨️' },
    73: { condition: 'Havazás', icon: '🌨️' },
    75: { condition: 'Erős havazás', icon: '❄️' },
    77: { condition: 'Hódara', icon: '❄️' },
    80: { condition: 'Gyenge zápor', icon: '🌦️' },
    81: { condition: 'Zápor', icon: '🌧️' },
    82: { condition: 'Heves zápor', icon: '⛈️' },
    85: { condition: 'Gyenge hózápor', icon: '🌨️' },
    86: { condition: 'Hózápor', icon: '❄️' },
    95: { condition: 'Zivatar', icon: '⛈️' },
    96: { condition: 'Zivatar jégesővel', icon: '⛈️' },
    99: { condition: 'Erős zivatar jégesővel', icon: '⛈️' },
  };

  return weatherConditions[weatherCode] ?? { condition: 'Ismeretlen', icon: '❔' };
};

export const getDayName = (date: string) => {
  return new Intl.DateTimeFormat('hu-HU', { weekday: 'long' }).format(new Date(date));
};
