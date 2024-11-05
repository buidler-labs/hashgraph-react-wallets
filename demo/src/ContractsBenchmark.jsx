import {
  useWriteContract,
  useWallet,
  useWatchTransactionReceipt,
} from "@buidlerlabs/hashgraph-react-wallets";
import { counterABI } from "./ABIs/Counter";
import { ContractId } from "@hashgraph/sdk";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import WhitelistAddress from "./WhitelistAddress";

const COUNTER_CONTRACT_ID = ContractId.fromString("0.0.3532256");

const ContractsBenchmark = () => {
  const { isConnected } = useWallet();
  const { watch } = useWatchTransactionReceipt();
  const [loading, setLoading] = useState(false);

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

        setLoading(false);
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

        setLoading(false);
        return transaction;
      },
    });
  };

  const handleWriteContract = async (functionName) => {
    try {
      setLoading(true);

      const transactionReceiptOrHash = await writeContract({
        contractId: COUNTER_CONTRACT_ID,
        abi: counterABI,
        functionName,
        metaArgs: { gas: 120_000 },
      });

      console.log({ transactionReceiptOrHash });
      if (
        transactionReceiptOrHash &&
        typeof transactionReceiptOrHash === "string"
      ) {
        onSubmitted(transactionReceiptOrHash);
      }
    } catch (e) {
      console.log(JSON.parse(JSON.stringify(e)));
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>Contracts:</div>
      <br />
      <div>Write contract</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.2rem" }}>
          <button
            onClick={() => handleWriteContract("inc")}
            disabled={!isConnected}
          >
            Increment
          </button>
          <button
            onClick={() => handleWriteContract("dec")}
            disabled={!isConnected}
          >
            Decrement
          </button>
          <button
            onClick={() => handleWriteContract("testError")}
            disabled={!isConnected}
          >
            Test error
          </button>
        </div>

        {loading && <PulseLoader size={10} />}
      </div>
      <hr/>
      <WhitelistAddress/>
    </div>
  );
};

export default ContractsBenchmark;
