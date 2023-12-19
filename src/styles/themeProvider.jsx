import { createTheme, ThemeProvider } from '@mui/material';

const darkBlue = '#325269';
const grayBlue = '#647680';
const orange = '#FE7A00';
const darkRed = '#CC0000';
const gray = '#999';

export default function MUIthemeProvider(props) {
  const theme = createTheme({
    palette: {
      primary: { main: darkBlue, light: grayBlue },
      secondary: { main: orange },
      error: { main: darkRed },
      info: { main: gray },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
      color: darkBlue,
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: darkBlue,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 2.6,
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
