import {
  useContract,
  useNetwork,
  useNetworkMismatch,
  useActiveListings
} from "@thirdweb-dev/react";
import {
  ChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Create: NextPage = () => {
  // Next JS Router hook to redirect to other pages
  const router = useRouter();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [price, setPrice] = useState(0);
  const [tokenBeingListed, setTokenBeingListed] = useState({
    contract: null,
    tokenId: null,
    price: null
  });

  // Connect to our marketplace contract via the useContract hook
  const { contract: marketplace } = useContract(
    "0xA0935388b74354948Ec0a46CCFA5598D9ED0a894", // Your marketplace contract address here
    "marketplace"
  );

  const { data: listings, isLoading: loadingListings } =
  useActiveListings(marketplace);


  // This function gets called when the form is submitted.
  async function handleCreateListing(e: any) {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Goerli);
        return;
      }

      // Prevent page from refreshing
      e.preventDefault();

      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult: undefined | TransactionResult = undefined;

      // De-construct data from form submission
      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      // Depending on the type of listing selected, call the appropriate function
      // For Direct Listings:
      if (listingType.value === "fixedPriceListing") {
        transactionResult = await createFixedPriceListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // For Auction Listings:
      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createAuctionListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  async function createFixedPriceListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e: any) => {
    const value = e.target.value;
    setTokenBeingListed(prev => ({...prev, [e.target.name]: e.target.value }));
    console.log("PRICE: ", tokenBeingListed.price);
  };

  return (
    <div>
      <main className="flex flex-col items-center w-full">
        <form onSubmit={(e) => handleCreateListing(e)}>
          <div className={"flex flex-col items-center justify-center h-[60vh]"}>
            {/* Form Section */}
            <div className={"bg-stone-50 rounded flex flex-col items-center space-y-4 w-full p-2 md:p-8 border"}>
              <h1 className={"text-lg md:text-2xl flex flex-wrap w-5/6 md:w-full text-center"}>
            What type of listing are you creating?
              </h1>

              {/* Toggle between direct listing and auction listing */}
              <div className={"flex flex-col items-start md:items-center md:justify-center md:flex-row md:space-x-4"}>
                <div className={"flex space-x-2"}>
                  <input
                    type="radio"
                    name="listingType"
                    id="fixedPriceListing"
                    value="fixedPriceListing"
                    defaultChecked
                    className={""}
                  />
                  <label htmlFor="fixedPriceListing" className={""}>
              Fixed Price Listing
                  </label>
                </div>
                <div className={"flex space-x-2"}>
                  <input
                    type="radio"
                    name="listingType"
                    id="auctionListing"
                    value="auctionListing"
                    className={""}
                  />
                  <label htmlFor="auctionListing" className={""}>
              Auction Listing
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center w-full space-y-2">
                {/* NFT Contract Address Field */}
                <input
                  type="text"
                  name="contract"
                  onChange={handleChange}
                  className={`rounded border p-1 focus:ring-[2px] focus:outline-none ${tokenBeingListed.contract ? "focus:ring-lime-500 border-lime-300/50" : "focus:pink-500 border-purple-300/50 focus:ring-purple-500"}`}
                  placeholder="NFT Contract Address"
                />

                {/* NFT Token ID Field */}
                <input
                  type="text"
                  name="tokenId"
                  onChange={handleChange}
                  className={`rounded border p-1 focus:ring-[2px] focus:outline-none ${tokenBeingListed.tokenId ? "focus:ring-lime-500 border-lime-300/50" : "focus:pink-500 border-purple-300/50 focus:ring-purple-500"}`}
                  placeholder="NFT Token ID"
                />

                {/* Sale Price For Listing Field */}
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  className={`rounded border p-1 focus:ring-[2px] focus:outline-none ${tokenBeingListed.price ? "focus:ring-lime-500 border-lime-300/50" : "focus:pink-500 border-purple-300/50 focus:ring-purple-500"}`}
                  placeholder="Sale Price"
                />
              </div>

              <button
                type="submit"
                className={`rounded-lg ${tokenBeingListed.contract && tokenBeingListed.tokenId && tokenBeingListed.price ? "bg-green-500 border border-green-400 hover:border-green-700 px-2 py-1 text-sm md:text-md lg:text-lg hover:bg-green-600 transition ease-in-out duration-200 text-white cursor-pointer" : "bg-red-500 border  px-2 py-1 text-sm md:text-md lg:text-lg hover:bg-red-600/90 transition ease-in-out duration-200 text-white cursor-not-allowed"}`}
              >
            List NFT
              </button>
            </div>
          </div>
        </form>
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
  );
};

export default Create;
