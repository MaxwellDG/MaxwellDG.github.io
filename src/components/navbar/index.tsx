import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const PATHS = {
  home: "Home",
  contact: "Contact us",
};

type NavLinkProps = {
  title: string;
  pathname: string;
  isActive: boolean;
};

function NavLink({ title, pathname, isActive }: NavLinkProps) {
  return (
    <Link
      title={title}
      to={pathname}
      style={{ ...styles.link, textAlign: "center" }}
    >
      <Box sx={{ display: "inline-block" }}>
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          {title}
        </Typography>
        <Box
          sx={{
            ...styles.blueLine,
            bgcolor: isActive ? "secondary.main" : "transparent",
          }}
        />
      </Box>
    </Link>
  );
}

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <Box sx={styles.box}>
      {Object.entries(PATHS).map((path: [string, string]) => (
        <NavLink
          key={path[0]}
          pathname={path[0] === "home" ? "/" : path[0]}
          title={path[1]}
          isActive={`/${path[0] === "home" ? "" : path[0]}` === pathname}
        />
      ))}
    </Box>
  );
}

const styles = {
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    height: 100,
  },
  link: {
    textDecoration: "none",
    width: 125,
  },
  text: {
    color: "text.primary",
  },
  blueLine: {
    height: 2,
    width: "100%",
  },
};
