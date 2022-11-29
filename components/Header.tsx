import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div className={"flex items-center w-full justify-between p-6"}>
      <div className={"flex"}>
        <div>
          <Link href="/" passHref role="button">
            <img
              src={"/logo.png"}
              alt="Thirdweb Logo"
              width={135}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      <div className={"flex items-center"}>
        <ConnectButton/>
      </div>
    </div>
  );
}
