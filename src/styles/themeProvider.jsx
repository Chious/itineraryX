import { createTheme, ThemeProvider } from "@mui/material";

export default function MUIthemeProvider(props) {
  const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#FF7F50",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
