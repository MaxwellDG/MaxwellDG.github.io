import {
  Box,
  CardActionArea,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import CoinDetails from "../coin-details";
import { COIN_NAMES } from "../../coin-images";
import coinImages from "../../coin-images";
import { motion } from "framer-motion";

export type CoinAPIAsset = {
  time: Date;
  asset_id_quote: string;
  rate: number;
};

type Props = {
  asset: CoinAPIAsset;
  index: number;
  isFocused: boolean;
  setFocusedAsset: (_asset: CoinAPIAsset) => void;
  updateFavourites: (_name: string) => void;
  isFavourite: boolean;
};

export default function CoinCard({
  asset,
  index,
  isFocused,
  setFocusedAsset,
  updateFavourites,
  isFavourite,
}: Props) {
  return (
    <motion.div
      key={asset.asset_id_quote}
      transition={{delay: 0.1 * index}}
      initial={{opacity: 0, marginTop: 20}}
      animate={{opacity: 1, marginTop: 0}}
      exit={{opacity: 0}}
    >
      <Paper elevation={10} sx={styles.paper}>
        <CardActionArea
          onClick={() => setFocusedAsset(asset)}
          disabled={isFocused}
          sx={styles.clickablePaper}
        >
          <Box sx={styles.insideBox}>
            <div style={styles.mainBox}>
              {coinImages[asset.asset_id_quote as COIN_NAMES](32)}
              <Typography sx={styles.name}>
                &nbsp;&nbsp;&nbsp;&nbsp;{asset.asset_id_quote}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography>{(1 / asset.rate).toFixed(2)}</Typography>
            </div>
          </Box>
        </CardActionArea>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            updateFavourites(asset.asset_id_quote);
          }}
          sx={{
            ...styles.favButton,
            ...(isFocused ? styles.focusedFav : styles.unfocusedFav),
          }}
          disableRipple
        >
          <GradeIcon style={{ color: isFavourite ? "yellow" : "#242426" }} />
        </IconButton>

        {isFocused && <CoinDetails key={asset.asset_id_quote} asset={asset} />}
      </Paper>
    </motion.div>
  );
}

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "secondary.light",
    boxShadow: "inset 0px 0px 15px 1px #e6e7e440",
    position: "relative",
  },
  insideBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    px: 1,
  },
  mainBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  clickablePaper: {
    p: 1,
  },
  name: {
    width: "75px",
  },
  favButton: {
    position: "absolute",
    right: 0,
    px: 2,
    width: "auto",
    borderRadius: 0,
  },
  focusedFav: {
    top: 4,
  },
  unfocusedFav: {
    top: 0,
    bottom: 0,
  },
};
