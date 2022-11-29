import type { NextPage } from "next";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Marketplace } from "@thirdweb-dev/sdk";

const Home: NextPage = () => {
  const router = useRouter();

  const { contract: marketplace } = useContract(
    "0x9e75a9c129eca8fa5c057625e8c8c6155adfb469", // Your marketplace contract address here
    "marketplace"
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  return (
    <>
      {/* Content */}
      <div className={"flex flex-col items-center w-full"}>
        {/* Top Section */}
        <h1 className={"text-4xl font-bold uppercase text-center tracking-[-3px]"}>Token Market</h1>

        <main className="flex flex-col items-center w-full text-center mx-auto">
          <p className="w-4/5">A marketplace where to list NFTs for a fixed price or auction.</p>
        </main>
      </div>
    </>
  );
};

export default Home;
