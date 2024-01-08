// I'm trying not to get rate-limited so I'm adding all the images here instead of retrieving them
// since on CoinAPI that's an additional call


import { ReactComponent as BTC } from "../assets/svgs/btc.svg";
import { ReactComponent as ADA } from "../assets/svgs/ada.svg";
import { ReactComponent as ETH } from "../assets/svgs/eth.svg";
import { ReactComponent as SOL } from "../assets/svgs/sol.svg";
import { ReactComponent as BNB } from "../assets/svgs/bnb.svg";

export enum COIN_NAMES {
  BTC = "BTC",
  ETH = "ETH",
  ADA = "ADA",
  SOL = "SOL",
  BNB = "BNB",
}

export default {
  BTC: (size: number) => <BTC height={size} width={size} />,
  ETH: (size: number) => <ETH height={size} width={size} />,
  ADA: (size: number) => <ADA height={size} width={size} />,
  SOL: (size: number) => <SOL height={size} width={size} />,
  BNB: (size: number) => <BNB height={size} width={size} />,
};
