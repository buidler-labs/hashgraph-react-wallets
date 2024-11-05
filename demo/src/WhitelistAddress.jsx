import {
  useWatchTransactionReceipt,
  useWriteContract,
} from "@buidlerlabs/hashgraph-react-wallets";
import { useRef, useState } from "react";
import { whitelistABI } from "./ABIs/Whitelist";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { AccountId, ContractId } from "@hashgraph/sdk";

const WHITELIST_ADDRESS_CONTRACT_ID = ContractId.fromString("0.0.4620062");

const WhitelistAddress = () => {
  const { watch } = useWatchTransactionReceipt();
  const [address, setAddress] = useState("");
  const loadingToastId = useRef();

  const { writeContract } = useWriteContract();

  const onSubmitted = (hashOrTransactionId) => {
    watch(hashOrTransactionId, {
      onSuccess: (transaction) => {
        console.log(transaction);

        const label = (
          <div>
            <div>SUCCESS: </div>
            <a
              href={`https://hashscan.io/testnet/transaction/${transaction.consensus_timestamp}`}
              target="_blank"
            >
              https://hashscan.io/testnet/transaction/
              {transaction.consensus_timestamp}
            </a>
          </div>
        );

        toast.success(label, {
          icon: "✅",
          style: { maxWidth: "unset" },
          duration: 6000,
        });

        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;

        return transaction;
      },
      onError: (transaction, error) => {
        console.log(error);
        const label = (
          <div>
            <div>FAILED: {transaction.result}</div>
            <a
              href={`https://hashscan.io/testnet/transaction/${transaction.consensus_timestamp}`}
              target="_blank"
            >
              https://hashscan.io/testnet/transaction/
              {transaction.consensus_timestamp}
            </a>
          </div>
        );

        toast.error(label, {
          icon: "❌",
          style: { maxWidth: "unset" },
          duration: 6000,
        });

        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;

        return transaction;
      },
    });
  };

  const handleWhitelistAddress = async () => {
    if (address === "") {
      toast.error("Please enter a hedera address", {
        icon: "❌",
        style: { maxWidth: "unset" },
        duration: 6000,
      });

      return;
    }

    try {
      const evmAddress = `0x${AccountId.fromString(
        address
      ).toSolidityAddress()}`;

      loadingToastId.current = toast.loading(
        `Whitelisting ${address}(${evmAddress})`,
        {
          icon: <PulseLoader size={10} />,
          style: { maxWidth: "unset" },
        }
      );

      const transactionReceiptOrHash = await writeContract({
        contractId: WHITELIST_ADDRESS_CONTRACT_ID,
        abi: whitelistABI,
        functionName: "whitelist",
        metaArgs: { gas: 120_000 },
        args: [evmAddress],
      });

      if (
        transactionReceiptOrHash &&
        typeof transactionReceiptOrHash === "string"
      ) {
        onSubmitted(transactionReceiptOrHash);
      }
    } catch (e) {
      console.log(JSON.parse(JSON.stringify(e)));
      console.error(e);
    } finally {
      setAddress("");
    }
  };

  return (
    <div>
      <div>Whitelist address:</div>
      <br />
      <div style={{ display: "flex", gap: "1rem" }}>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handleWhitelistAddress}>Whitelist address</button>
      </div>
    </div>
  );
};

export default WhitelistAddress;
