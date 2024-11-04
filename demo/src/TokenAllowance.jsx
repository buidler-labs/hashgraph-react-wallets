import {
  useApproveTokenAllowance,
  useWallet,
  useWatchTransactionReceipt,
} from "@buidlerlabs/hashgraph-react-wallets";
import { useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const TokenAllowance = () => {
  const [loading, setLoading] = useState(false);
  const { isConnected } = useWallet();
  const { approve } = useApproveTokenAllowance();
  const { watch } = useWatchTransactionReceipt();

  const tokens = [{ tokenId: "0.0.3504912", amount: 100000000 }];
  const spender = "0.0.2173123";

  const handleApproveTokens = async () => {
    try {
      setLoading(true);
      const hashOrTransactionId = await approve(tokens, spender);
      console.log({ hashOrTransactionId });

      if (!hashOrTransactionId) {
        console.log({ hashOrTransactionId });
        throw new Error("No hash or transactionId found");
      }

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
          });

          setLoading(false);
          return transaction;
        },
        onError: (transaction) => {
          console.log(transaction);

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
          });

          setLoading(false);
          return transaction;
        },
      });
    } catch (e) {
      const jError = JSON.parse(JSON.stringify(e));
      console.log({ jError });
      toast.error(jError.shortMessage || jError.status, {
        icon: "❌",
        style: { maxWidth: "unset" },
      });
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <div>Token allowance</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>
          <pre>{JSON.stringify(tokens, null, 2)}</pre>
          <br />
          <div>
            Spender: <pre>{spender}</pre>
          </div>
        </div>
        <button onClick={handleApproveTokens} disabled={!isConnected}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span>Approve</span>
            {loading && <PulseLoader size={10} />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default TokenAllowance;
