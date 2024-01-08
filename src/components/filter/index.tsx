import {
  Breadcrumbs,
  Chip,
  emphasize,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useCallback } from "react";

export enum FILTER {
  FAVOURITES = "Favourites",
  H2L = "Highest",
  L2H = "Lowest",
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.secondary.main;
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

type Props = {
  filters: FILTER[];
  updateFilters: (_filter: FILTER) => void;
};

export default function Filter({ filters, updateFilters }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));


  const isActive = useCallback(
    (filter: FILTER) => {
      return filters.includes(filter);
    },
    [filters]
  );

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={styles.breadcrumbs}
      separator={null}
    >
      <StyledBreadcrumb
        component="button"
        label={FILTER.FAVOURITES}
        onClick={() => updateFilters(FILTER.FAVOURITES)}
        icon={
          <GradeIcon
            style={{
              color: isActive(FILTER.FAVOURITES) ? "yellow" : "white",
            }}
            fontSize="small"
          />
        }
        sx={{
          border: 2,
          borderColor: isActive(FILTER.FAVOURITES) ? "white" : "transparent",
          fontSize: isMobile ? 10 : 12,
        }}
      />
      <StyledBreadcrumb
        component="button"
        label={FILTER.H2L}
        onClick={() => updateFilters(FILTER.H2L)}
        icon={
          <ArrowUpwardIcon
            style={{
              color: "white",
            }}
            fontSize="small"
          />
        }
        sx={{
          border: 2,
          borderColor: isActive(FILTER.H2L) ? "white" : "transparent",
          fontSize: isMobile ? 10 : 12,
        }}
      />
      <StyledBreadcrumb
        component="button"
        onClick={() => updateFilters(FILTER.L2H)}
        label={FILTER.L2H}
        sx={{
          border: 2,
          borderColor: isActive(FILTER.L2H) ? "white" : "transparent",
          fontSize: isMobile ? 10 : 12,
        }}
        icon={<ArrowDownwardIcon style={{ color: "white" }} fontSize="small" />}
      />
    </Breadcrumbs>
  );
}

const styles = {
  breadcrumbs: {
    columnGap: 1,
    alignItems: "center",
  },
};
