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
    "0x277C0FB19FeD09c785448B8d3a80a78e7A9B8952", // Your marketplace contract address here
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
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              // Otherwise, show the listings
              <div className={""}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={""}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={""}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={""}>{listing.asset.name}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </main>
      </div>
    </>
  );
};

export default Home;
