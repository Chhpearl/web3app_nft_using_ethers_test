import styles from "./index.less";
import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import { injected } from "./web3";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import useActiveWeb3React from "./web3/hooks/useActiveWeb3React";
import { getNftContract } from "./web3/utils/contractHelpers";
import { Button, message } from "antd";
import { default as Abi } from "./web3/abi/nft.json";
import type { AbiItem } from "web3-utils";
import BigNumber from "bignumber.js/bignumber";
import { useCallWithGasPrice } from "./web3/hooks/useCallWithGasPrice";
import { setupNetwork } from "./web3/wallet";

const DEFAULT_GAS_LIMIT = 380000;

export default function IndexPage() {
  const web3 = new Web3(Web3.givenProvider);
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  useEffect(() => {
    if (localStorage.getItem("isActivate")) {
      connect();
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum === "undefined") {
      message.warning({
        content: "请安装小狐狸",
        style: {
          marginTop: "10vh",
        },
      });
    } else {
      try {
        const hasSetup = await setupNetwork();
        if (hasSetup) {
          await activate(injected);
          localStorage.setItem("isActivate", "true");
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  const [balance, setBalance] = useState<any>(0);
  useEffect(() => {
    if (!!account && !!library) {
      gBalance();
    }
    setBalance(0);
  }, [account, library]);

  async function gBalance() {
    try {
      if (account) {
        const balanceNumber = await web3.eth.getBalance(account);
        const number = new BigNumber(balanceNumber).div(BIG_TEN.pow(18));
        setBalance(Number(number));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const spenderAddress = '0x176a1660dd8470958bf5e6e9023138515653fccd';
  const spenderAddress = "0xbfb6C22b363d06c64bdff5a890Ff73FB6Cb7242F";
  const abiType = (abi: unknown): AbiItem => abi as AbiItem;
  const contract = new web3.eth.Contract(abiType(Abi), spenderAddress);

  const BIG_TEN = new BigNumber(10);

  const useVault = (address: string) => {
    const { library } = useActiveWeb3React();
    return useMemo(
      () => getNftContract(address, library.getSigner()),
      [address, library]
    );
  };

  const useVault721 = (address: string) => {
    const { library } = useActiveWeb3React();
    return useMemo(
      () => getNftContract(address, library.getSigner()),
      [address, library]
    );
  };

  const mint = async () => {
    try {
      const amount = new BigNumber(1).times(BIG_TEN.pow(18)).toString();
      // const res = await contract.methods
      //   .setApprovalForAll(spenderAddress, amount)
      //   .send({ from: account });

      handleDeposit(amount);
    } catch (error) {
      if (error) {
        console.info("error", error);
      }
    }
  };

  const depositContract = useVault(spenderAddress);
  const approveContract = useVault721(spenderAddress);
  const { callWithGasPrice } = useCallWithGasPrice();

  const getInfo = async () => {
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const owner = await contract.methods.owner().call();
    console.info({ name, symbol, owner });
  };

  const handleDeposit = async (depositAmount: any) => {
    const callOptionsETH = {
      gasLimit: DEFAULT_GAS_LIMIT,
      value: depositAmount.toString(),
    };

    try {
      // const func = await depositContract.mintTo(account, {
      //   value: web3.utils.toWei('0.01', 'ether'),
      //   gasLimit: DEFAULT_GAS_LIMIT,
      // });
      // console.info('func', func);

      const tx = await callWithGasPrice(
        depositContract,
        "mintTo",
        [account],
        callOptionsETH
      );
      const receipt = await tx.wait();
      console.info(receipt);
      if (receipt.status) {
        message.success({
          content: "success",
          style: {
            marginTop: "10vh",
          },
        });
      }
    } catch (error) {
      console.info("error", error);
      message.error({
        content: "error",
        style: {
          marginTop: "10vh",
        },
      });
    } finally {
    }
  };

  const getApprove = async () => {
    handleApprove();
  };

  const handleApprove = async () => {
    try {
      const tx = await approveContract.setApprovalForAll(spenderAddress, true);
      console.info(tx);
      const receipt = await tx.wait();
      if (receipt.status) {
        console.info("Approved!", "Your request has been approved");
      } else {
        console.info(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
      }
    } catch (error: any) {
      console.info("Error", error);
    } finally {
    }
  };

  return (
    <>
      <div className={styles["wmx-pass-content1"]}>
        <div className={styles["wmx-pass-content1-left"]}>
          nft 价格 1eth
          <div className={styles["wmx-pass-content1-left2"]}>
            {active ? (
              <Button
                className={styles["wmx-pass-content1-button1"]}
                onClick={mint}
              >
                Mint
              </Button>
            ) : (
              <Button
                className={styles["wmx-pass-content1-button"]}
                onClick={connect}
              >
                连接钱包
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
