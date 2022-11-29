import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import tmLogo from "/tm-logo.png";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const showMenu = () => {
    setMenuActive(!menuActive);
  };

  const tabs = [
    { tabName: "CREATE", pageName: "/create" },
    { tabName: "MINT", pageName: "/mint" },
  ];
  const { pathname } = useRouter();
  return (
    <div className="flex w-full p-6 justify-between items-center relative">
      <div className={"flex"}>
        <div>
          <Link href="/" passHref role="button">
            <div className="h-8 w-8 md:h-24 md:w-24 flex relative cursor-pointer">
              <Image
                src={tmLogo}
                alt="Token Market Logo"
                layout="fill"
              />
            </div>
          </Link>
        </div>
      </div>
      {!menuActive ? (
        <div className="flex">
          {tabs.map((tab) => (
            <Link href={tab.pageName} key={tab.tabName}>
              <h2
                className={`hidden md:flex font-semibold px-4 py-1 items-center cursor-pointer hover:bg-gradient-to-b hover:from-yellow-400  hover:bg-[length:50%_2px] hover:bg-no-repeat hover:bg-bottom ${pathname === tab.pageName ? "justify-center bg-gradient-to-b from-black/80 bg-[length:50%_2px] bg-no-repeat bg-bottom" : "justify-center"} `}
              >
                {tab.tabName}
              </h2>
            </Link>
          ))}
          <div className="hidden md:flex">
            <ConnectButton/>
          </div>
        </div>
      ) : (
        <div className="flex md:hidden flex-col w-[40vh] items-end p-4 z-20 absolute min-h-screen top-2 right-2 bg-white/80 backdrop-blur-md">
          <XCircleIcon
            onClick={showMenu}
            className="h-8 w-8 cursor-pointer md:hidden text-teal-600 dark:text-teal-500 hover:text-teal-600 transition ease-in-out duration-75"
          />
          <div className="relative">
            <div className="fixed right-2 bottom-4">
              <ConnectButton/>
            </div>
          </div>
        </div>
      )}
      <Bars3Icon
        onClick={showMenu}
        className="h-8 w-8 cursor-pointer md:hidden text-teal-600 dark:text-teal-500 hover:text-teal-600 transition ease-in-out duration-75"
      />
    </div>
  );
}
