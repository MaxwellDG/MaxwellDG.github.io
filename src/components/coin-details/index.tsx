import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useSWR from "swr";
import { CoinAPIAsset } from "../coin-card";
import { coinAPIfetcher } from "../../utils/fetcher";
import coinImages, { COIN_NAMES } from "../../coin-images";
import { numberWithCommas } from "../../utils/numbers";
import { motion } from "framer-motion";
import { useState } from "react";

const BASE_URL = "https://rest.coinapi.io/v1/assets/";

type Props = {
  asset: CoinAPIAsset;
};

export default function CoinDetails({ asset }: Props) {
  const theme = useTheme();
  const { data, error } = useSWR(
    BASE_URL + asset.asset_id_quote,
    coinAPIfetcher,
    { refreshInterval: 15000 }
  );

  const notMobile = useMediaQuery(theme.breakpoints.not("xs"));

  const [animateDone, toggleAnimateDone] = useState(false);

  if (error)
    return (
      <Typography variant="subtitle1">Error getting coin details</Typography>
    );

  return (
    <motion.div
      style={{ opacity: animateDone ? 1 : 0, width: '100%' }}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      onAnimationComplete={() => toggleAnimateDone(true)}
    >
      <Box sx={{ ...styles.innerBox }}>
        {notMobile && (
          <Box style={styles.leftBox}>
            {coinImages[asset.asset_id_quote as COIN_NAMES](128)}
          </Box>
        )}
        <Box sx={styles.descBox}>
          <Box sx={{ ...styles.textCon, marginBottom: 2 }}>
            <Typography variant="subtitle1">Name:&nbsp;&nbsp;</Typography>
            <Typography sx={styles.dataText}>
              {data?.length && data[0].name}
            </Typography>
          </Box>
          <Typography variant="subtitle1">Trading volumes:</Typography>
          <Box sx={[styles.textCon, styles.smallText]}>
            Monthly:&nbsp;
            <Typography sx={[styles.dataText, styles.smallText]}>
              $ {data?.length && numberWithCommas(data[0].volume_1mth_usd)} USD
            </Typography>
          </Box>
          <Box sx={[styles.textCon, styles.smallText]}>
            Daily:&nbsp;
            <Typography sx={[styles.dataText, styles.smallText]}>
              $ {data?.length && numberWithCommas(data[0].volume_1day_usd)} USD
            </Typography>
          </Box>
          <Box sx={[styles.textCon, styles.smallText]}>
            Hourly:&nbsp;
            <Typography sx={[styles.dataText, styles.smallText]}>
              $ {data?.length && numberWithCommas(data[0].volume_1hrs_usd)} USD
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

const styles = {
  leftBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 128,
    width: '50%',
  },
  innerBox: {
    display: "flex",
    columnGap: 2,
    p: 2,
    width: "100%",
    mb: 2,
  },
  descBox: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  textCon: {
    display: "flex",
    alignItems: "center",
  },
  dataText: {
    color: "text.secondary",
  },
  smallText: {
    fontSize: 13,
  },
};
