import { useEffect, useState } from "react";
import { useVeninContext } from "../core/VeninProvider";

const useLiveContract = ({ address, abi = null }) => {
  const {
    venin: { session },
  } = useVeninContext();

  const [state, setState] = useState({
    contract: null,
    isLoading: true,
  });

  const abiString = abi.toString();

  useEffect(() => {
    (async () => {
      try {
        if (!address) throw new Error("Contract address not provided");
        if (!abi) throw new Error("Contract ABI not provided");
        if (!session) throw new Error("Venin session not found");

        const contract = await session.getLiveContract({
          id: address,
          abi,
        });

        setState({
          contract,
          isLoading: false,
        });
      } catch (e) {
        console.error("Failed to get live contract.", e.message);
      }
    })();
    // eslint-disable-next-line
  }, [session, address, abiString]);

  return state;
};

export default useLiveContract;
