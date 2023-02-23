const REACT_APP_CHAIN_ID = '5';

export const setupNetwork = async () => {
  const provider = window.ethereum;
  console.info('provider', provider);
  if (provider) {
    const chainId = parseInt(REACT_APP_CHAIN_ID, 10);
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });

      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  } else {
    console.error("Can't setup the network on metamask");
    return false;
  }
};
