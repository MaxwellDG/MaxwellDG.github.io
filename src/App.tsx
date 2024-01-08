import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screens/main";
import Contact from "./screens/contact";
import NavBar from "./components/navbar";
import Theme from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container sx={styles.container}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "secondary.light",
    alignItems: "center",
    minHeight: "100%",
    pb: 2
  },
};

export default App;
