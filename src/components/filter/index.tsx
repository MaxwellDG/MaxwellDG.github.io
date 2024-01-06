import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useCallback, useMemo, useState } from "react";

export enum FILTER {
  NONE = "none",
  FAVOURITES = "Favourites",
  H2L = "Highest to lowest",
  L2H = "Lowest to highest"
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
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
  filters: FILTER[],
  updateFilters: (_filter: FILTER, _isFilter: boolean) => void
}

export default function Filter({ filters, updateFilters}: Props) {

  const isFiltered = useCallback((filter: FILTER) => {
    return filters.includes(filter);
  }, [filters])

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.breadcrumbs}>
      <StyledBreadcrumb
        component="button"
        label={FILTER.FAVOURITES}
        onClick={() => updateFilters(FILTER.FAVOURITES, isFiltered(FILTER.FAVOURITES))}
        icon={<GradeIcon fontSize="medium" />}
      />
      <StyledBreadcrumb
        component="button"
        label={FILTER.H2L}
        onClick={() => updateFilters(FILTER.H2L, isFiltered(FILTER.H2L))}
        icon={<ArrowUpwardIcon fontSize="medium" />}
      />
      <StyledBreadcrumb
        component="button"
        onClick={() => updateFilters(FILTER.L2H, isFiltered(FILTER.L2H))}
        label={FILTER.L2H}
        icon={<ArrowDownwardIcon fontSize="medium" />}
      />
    </Breadcrumbs>
  );
}

const styles = {
  breadcrumbs: {
    columnGap: 1
  }
}
