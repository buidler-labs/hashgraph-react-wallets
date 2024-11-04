import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletBtn from "./WalletBtn";
import * as React from "react";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";

describe("Render app", () => {
  test("renders app.jsx", () => {
    render(<WalletBtn name="hashpack" Connector={HashpackConnector} isMagic={false} />);
    expect(screen).toMatchSnapshot();
  });
});
