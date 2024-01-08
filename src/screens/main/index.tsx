import useSWR, { preload } from "swr";
import { coinAPIfetcher } from "../../utils/fetcher";
import { Box, IconButton, Typography } from "@mui/material";
import CoinCard, { CoinAPIAsset } from "../../components/coin-card";
import { useEffect, useMemo, useState } from "react";
import Filter, { FILTER } from "../../components/filter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const URL =
  "https://rest.coinapi.io/v1/exchangerate/USD?filter_asset_id=BTC,ADA,ETH,SOL,BNB";
const FADE_MS = 500;

preload(URL, coinAPIfetcher);

export default function Main() {
  const { data, error } = useSWR(URL, coinAPIfetcher, {
    refreshInterval: 5000,
  });

  const [focusedAsset, setFocusedAsset] = useState<CoinAPIAsset | null>(null);
  const [favouritesHash, setFavouritesHash] = useState<Record<string, boolean>>(
    {}
  );
  const [filters, setFilters] = useState([] as FILTER[]);
  const [transitionDone, toggleTransitionDone] = useState(false);

  // create a hashmap for favourites only on first data retrieval
  useEffect(() => {
    if (data?.rates && Object.keys(favouritesHash).length === 0) {
      let result = data.rates.reduce(function (
        map: Record<string, boolean>,
        obj: CoinAPIAsset
      ) {
        map[obj.asset_id_quote] = false;
        return map;
      },
      {});
      setFavouritesHash(result);
    }
  }, [data, favouritesHash, setFavouritesHash]);

  function updateFavourites(name: string) {
    if (favouritesHash.hasOwnProperty(name)) {
      setFavouritesHash((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  }

  function updateFilters(filter: FILTER) {
    const hasFilter = filters.includes(filter);
    if (hasFilter) {
      setFilters(filters.filter((_filter) => _filter !== filter));
    } else {
      let copy = [...filters];
      copy.push(filter);
      switch (filter) {
        case FILTER.H2L: {
          copy = copy.filter((filter) => filter !== FILTER.L2H);
          break;
        }
        case FILTER.L2H: {
          copy = copy.filter((filter) => filter !== FILTER.H2L);
          break;
        }
      }
      setFilters(copy);
    }
  }

  const waitThenSetFocusedAsset = (item: CoinAPIAsset) => {
    setFocusedAsset(item);
    setTimeout(() => {
      toggleTransitionDone(true);
    }, FADE_MS + 250);
  };

  const filteredData = useMemo(() => {
    // data hasn't loaded yet
    if (!data?.rates?.length) return [];

    // a single item is focused
    if (focusedAsset) return [focusedAsset];

    // there's no filters
    if (!filters.length) return data?.rates ?? [];

    // filter by favourites if required
    const workingArray = filters.includes(FILTER.FAVOURITES)
      ? data.rates.filter(
          (asset: CoinAPIAsset) => favouritesHash[asset.asset_id_quote]
        )
      : data.rates;

    // sort if required
    if (filters.includes(FILTER.H2L) || filters.includes(FILTER.L2H)) {
      const isAscending = filters.includes(FILTER.L2H);
      workingArray.sort((a: CoinAPIAsset, b: CoinAPIAsset) => {
        if (a.rate > b.rate) return isAscending ? -1 : 1;
        else if (a.rate === b.rate) return 0;
        else return isAscending ? 1 : -1;
      });
    }
    return workingArray;
  }, [data, filters, focusedAsset, transitionDone, favouritesHash]);

  return (
    <Box sx={styles.box}>
      <Box
        sx={{
          ...styles.topBox,
          justifyContent: focusedAsset ? "flex-start" : "flex-end",
        }}
      >
        {focusedAsset ? (
          <IconButton
            disableRipple
            onClick={() => {
              toggleTransitionDone(false);
              setFocusedAsset(null);
            }}
            style={{ all: "unset", cursor: "pointer" }}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Filter
            filters={filters}
            updateFilters={(_filter: FILTER) => updateFilters(_filter)}
          />
        )}
      </Box>
      <Box sx={styles.innerBox}>
        {data?.error || error ? (
          <Typography>
            {data?.error
              ? "Rate limited. Please wait for update"
              : "Error. GG if this happens I definitely failed"}
          </Typography>
        ) : (
          filteredData.map((data: CoinAPIAsset, i: number) => (
            <CoinCard
              key={data.asset_id_quote}
              index={i}
              asset={data}
              setFocusedAsset={(asset) => waitThenSetFocusedAsset(asset)}
              isFocused={
                focusedAsset?.asset_id_quote === data?.asset_id_quote &&
                transitionDone
              }
              updateFavourites={(_name: string) => updateFavourites(_name)}
              isFavourite={favouritesHash[data.asset_id_quote]}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
    width: "100%",
    maxWidth: 500,
  },
  topBox: {
    display: "flex",
    alignItems: "center",
    height: "40px",
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
  },
};
