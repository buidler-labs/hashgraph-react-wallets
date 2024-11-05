import {
  useChain,
  useSwitchChain,
  useWallet
} from "@buidlerlabs/hashgraph-react-wallets";

const ChainSwitcher = () => {
  const { isConnected } = useWallet();
  const { data: chainData } = useChain();
  const { chains, switchChain } = useSwitchChain();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        value={chainData?.chain?.id || 1}
        onChange={(e) => switchChain(parseInt(e.target.value))}
        disabled={!isConnected}
      >
        {chains?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSwitcher;
