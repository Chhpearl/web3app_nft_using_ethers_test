// //app.tsx
// import { Web3ReactProvider } from '@web3-react/core';
// import Web3 from 'web3';

// export function rootContainer(container: any) {

//   return (
//     <Web3ReactProvider getLibrary={(provider: any) => new Web3(provider)}>
//       {container}
//     </Web3ReactProvider>
//   );
// }

import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import App from "./pages/index";

export function rootContainer(container: any) {
  const POLLING_INTERVAL = 12000;
  const getLibrary = (provider): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
