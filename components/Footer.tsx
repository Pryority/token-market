import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function Footer() {
  return (
    <div className="fixed md:hidden bottom-0 w-full p-6 justify-between items-center">
      <div className="">
        <ConnectButton/>
      </div>
    </div>
  );
}
