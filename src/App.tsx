import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screens/main";
import Contact from "./screens/contact";
import NavBar from "./components/navbar";
import theme from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container sx={styles.container}>
          <NavBar />
          <Container sx={styles.innerContainer}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const styles = {
  innerContainer: {
    display: 'flex',  
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    bgcolor: "secondary.light", 
    height: "100vh" 
  },
};

export default App;
