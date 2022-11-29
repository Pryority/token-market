import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import tmLogo from "/tm-logo.png";

export default function Header() {
  const tabs = [
    { tabName: "CREATE", pageName: "/create" },
    { tabName: "MINT", pageName: "/mint" },
  ];
  const { pathname } = useRouter();
  return (
    // <div className={"flex items-center w-full justify-between p-6"}>
    <div className="flex w-full p-6 justify-between items-center">
      <div className={"flex"}>
        <div>
          <Link href="/" passHref role="button">
            <div className="h-24 w-24 flex relative">
              <Image
                src={tmLogo}
                alt="Token Market Logo"
                layout="fill"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex">
        {tabs.map((tab) => (
          <Link href={tab.pageName} key={tab.tabName}>
            <h2
              className={`font-semibold px-4 py-1 items-center cursor-pointer hover:bg-gradient-to-b hover:from-yellow-400  hover:bg-[length:50%_2px] hover:bg-no-repeat hover:bg-bottom ${pathname === tab.pageName ? "justify-center flex text-center bg-gradient-to-b from-black/80 bg-[length:50%_2px] bg-no-repeat bg-bottom" : "justify-center flex text-center"} `}
            >
              {tab.tabName}
            </h2>
          </Link>
        ))}
        <div className={"flex items-center"}>
          <ConnectButton/>
        </div>
      </div>
    </div>
    // </div>
  );
}
