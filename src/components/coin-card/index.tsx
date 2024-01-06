import { Paper, Typography } from "@mui/material";
import { CoinAPIAsset } from "../../types/coinApi";
import GradeIcon from "@mui/icons-material/Grade";

type Props = {
  asset: CoinAPIAsset;
  isFocused: boolean;
  setFocusedAsset: (_asset: CoinAPIAsset) => void;
  updateFavourites: (_name: string, _isFavourite: boolean) => void;
  isFavourite: boolean;
};

export default function CoinCard({
  asset,
  isFocused,
  setFocusedAsset,
  updateFavourites,
  isFavourite,
}: Props) {
  return (
    <Paper elevation={4} sx={styles.paper}>
      <Typography>{asset.asset_id_quote}</Typography>
      <Typography>{1 / asset.rate}</Typography>
      <button style={{ all: "unset" }} onClick={() => updateFavourites(asset.asset_id_quote, isFavourite)}>
        <GradeIcon color={isFavourite ? "action" : "disabled"} />
      </button>
    </Paper>
  );
}

const styles = {
  paper: {
    display: 'flex',
    alignItems: 'center'
  }
}
