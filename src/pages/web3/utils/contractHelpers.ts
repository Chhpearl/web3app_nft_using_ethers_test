import { ethers } from 'ethers';
import { simpleRpcProvider } from './providers';
// ABI
import VaultABI from '../abi/nft.json';

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getNftContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) => {
  return getContract(VaultABI, address, signer);
};
