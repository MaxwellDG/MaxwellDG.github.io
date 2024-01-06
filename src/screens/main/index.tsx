import useSWR, { preload } from "swr";
import { coinAPIfetcher } from "../../utils/fetcher";
import { Box } from "@mui/material";
import CoinCard from "../../components/coin-card";
import { useMemo, useState } from "react";
import { CoinAPIAsset } from "../../types/coinApi";
import { FILTER } from "../../components/filter";

const URL = "https://rest.coinapi.io/v1/exchangerate/CAD?filter_asset_id=BTC,ETH,SOL,ADA";

preload(URL, coinAPIfetcher);

// TODO get a fresh API key right before you submit

export default function Main() {
  const { data, isLoading, error } = useSWR(URL, coinAPIfetcher);

  const [focusedAsset, setFocusedAsset] = useState<CoinAPIAsset>();
  const [favourites, setFavourites] = useState<string[]>([]);
  const [filter, setFilter] = useState([] as FILTER[])

  function updateFavourites(name: string, isFavourite: boolean) {
    if (isFavourite) {
      setFavourites(favourites.filter((_name) => _name === name));
    } else {
      const copy = [...favourites];
      copy.push(name);
      setFavourites(copy);
    }
  }

  console.log("DATA: ", data);

  const displayData = useMemo(() => {

  }, [data, ])

  return (
    <Box style={styles.box}>
      {data?.rates.map((data: CoinAPIAsset) => (
        <CoinCard
          asset={data}
          setFocusedAsset={(asset) => setFocusedAsset(asset)}
          isFocused={focusedAsset?.asset_id_quote === data?.asset_id_quote}
          updateFavourites={(_name: string, _isFavourite: boolean) =>
            updateFavourites(_name, _isFavourite)
          }
          isFavourite={favourites.includes(data.asset_id_quote)}
        />
      ))}
    </Box>
  );
}

const styles = {
  box: {
    rowGap: 2
  }
}