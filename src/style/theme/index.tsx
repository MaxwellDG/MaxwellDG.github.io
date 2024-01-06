import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#07062f",
    },
    primary: {
      main: "#07062f",
      light: "#3c64f6",
    },
    secondary: {
      main: "#99dbea",
      light: "#39395880",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      // TODO Inter and Poppins
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter-Regular'), url('../fonts/Inter/Inter-Regular.ttf') format('ttf');
        }
      `,
    },
  },
});

export default responsiveFontSizes(theme);
