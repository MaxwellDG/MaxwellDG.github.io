import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={styles.box}>
      <Link title="Home" to="/" style={styles.link}>
        <Typography variant="h5" sx={{color: 'text.primary'}}>Home</Typography>
      </Link>
      <Link title="Contact us" to="/contact" style={styles.link}>
        <Typography variant="h5" sx={{color: 'text.primary'}}>Contact us</Typography>
      </Link>
    </Box>
  );
}

const styles = {
  box: {
    display: "flex",
    justifyContent: 'center',
    gap: 2,
  },
  link: {
    textDecoration: "none",
  },
  text: {
    color: 'text.primary'
  }
};
