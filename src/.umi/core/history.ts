// @ts-nocheck
import {
  createBrowserHistory,
  History,
} from "/Users/mac/code/区块链学习/web3app_nft_using_ethers_test/node_modules/umi/node_modules/@umijs/runtime";

let options = {
  basename: "/",
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER
  ? null
  : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
