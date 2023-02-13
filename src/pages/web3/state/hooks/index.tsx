import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../index";

import { GAS_PRICE_GWEI } from "./helpers";

const REACT_APP_CHAIN_ID = "5";
const MAINNET = "5";
export function useGasPrice(): string {
  const chainId = REACT_APP_CHAIN_ID;

  // const userGas = useSelector<AppState, AppState['user']['gasPrice']>(
  //   (state) => state.user.gasPrice,
  // );
  return chainId === "5" ? GAS_PRICE_GWEI.testnet : GAS_PRICE_GWEI.testnet;
}
