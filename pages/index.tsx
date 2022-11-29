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
        <h1 className={"text-4xl font-bold uppercase tracking-[-3px]"}>Token Market</h1>

        <hr className={""} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create">
            <a className={"bg-purple-600 text-purple-50 p-2 px-6 rounded-lg border border-purple-300"} style={{ textDecoration: "none" }}>
              Create A Listing
            </a>
          </Link>
        </div>

        <main className="flex flex-col items-center w-full">
          <div>placeholder</div>
        </main>
      </div>
    </>
  );
};

export default Home;
