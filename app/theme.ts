'use client'

import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(0, 255, 155)',
    },
    background: {
      default: 'rgb(44,49,81)',
      paper: 'rgb(44,49,81)',
    },
    text: {
      primary: '#ffffff'
    },
  },
  typography: {
    fontFamily: [
      'Inter',
    ].join(','),
    fontSize: 12
  },
});

export default darkTheme