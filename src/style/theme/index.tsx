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
      main: "#3d64f7",
      light: "#39395880",
    },
    text: {
      primary: "#FFFFFF",
      secondary: '#9f9eb3'
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
  },
  components: {
    // Name of the component
    MuiContainer: {
      defaultProps: {
        
      }
    }
  },
});

export default responsiveFontSizes(theme);
