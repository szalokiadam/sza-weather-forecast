import { styled, Typography, TypographyProps } from '@mui/material';

// colors
export const colors = {
  black: '#000000',
  gray: '#686868',
  white: '#FFFFFF',
  red: '#FF0000',
  green: '#008000',
  blue: '#0000FF',
  lightBlue1: '#7CB9E8',
  lightBlue2: '#A3D4FA',
  yellow: '#FFFF00',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  brown: '#A52A2A',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  lime: '#00FF00',
  navy: '#000080',
  teal: '#008080',
  olive: '#808000',
  maroon: '#800000',
  silver: '#C0C0C0',
  gold: '#FFD700',
  beige: '#F5F5DC',
  ivory: '#FFFFF0',
  coral: '#FF7F50',
  salmon: '#FA8072',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  indigo: '#4B0082',
  transparent: 'transparent',
};

// TEXTS
export const BasicText = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Inter',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1,
  color: colors.white,
}));
