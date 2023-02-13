import { ethers } from "ethers";

const RPC_URL = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const RPC_URL =
//   'https://eth-mainnet.g.alchemy.com/v2/w70EBVGnxbSsWz6u_IPT7kZFA0bxmzuZ';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export default null;
