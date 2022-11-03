import { NFTObject } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const NFTMarketView = ({ nft }: { nft?: NFTObject }) => {
  const { components, hooks } = useContext(ThemeContext)!;
  const { PricingString, CountdownDisplay, PrimarySalePurchaseButton, Link } =
    components;
  const { useFindAuction, useFindAsk } = hooks;

  const { data: secondary } = hooks.useNFTSecondary({
    contractAddress: nft?.nft?.contract.address as string,
    chain: "ETHEREUM",
    tokenId: nft?.nft?.tokenId as string,
  });

  console.log("secondary", secondary);

  const auction = useFindAuction(secondary);
  const ask = useFindAsk(secondary);

  const border = "flex flex-col border border-gray-200 rounded-3xl p-6";

  const askView = () => {
    if (!ask?.amount) return <Fragment />;
    return (
      <div className={border}>
        <div className="text-gray-500 text-lg font-light">Buy Now</div>
        <div className="flex flex-col">
          <PricingString
            pricing={ask.amount}
            showUSD={false}
            className={{
              amount: "text-black text-3xl",
              usd: "text-gray-500 text-sm font-light",
            }}
          />
        </div>
        <Link
          href={`/assets/ETHEREUM/${nft?.nft?.contract.address}/${nft?.nft?.tokenId}/buy`}
        >
          <a className="bg-black mt-4 text-white flex items-center justify-around h-12 rounded-md w-full">
            Buy Now
          </a>
        </Link>
      </div>
    );
  };

  const auctionView = () => {
    if (!auction?.amount) return <Fragment />;

    if (auction.currentBid && auction.endsAt)
      return (
        <div className={border}>
          <div className="flex items-top">
            <div className="border-r border-gray-200 w-1/2 -pr-24">
              <div className="text-gray-500 text-lg font-light">
                Current Bid
              </div>
              <div className="flex flex-col">
                <PricingString
                  pricing={auction.currentBid.amount}
                  showUSD={false}
                  className={{
                    amount: "text-black text-3xl",
                    usd: "text-gray-500 text-sm font-light",
                  }}
                />
              </div>
            </div>
            <div className="ml-8">
              <div className="text-gray-500 text-lg font-light">Ends At</div>
              <span className="text-black text-3xl">
                <CountdownDisplay to={auction.endsAt.timestamp} />
              </span>
            </div>
          </div>
          <Link
            href={`/assets/ETHEREUM/${nft?.nft?.contract.address}/${nft?.nft?.tokenId}/bid`}
          >
            <a className="bg-black mt-4 text-white flex items-center justify-around h-12 rounded-md w-full">
              Place Bid
            </a>
          </Link>
        </div>
      );

    if (auction.amount)
      return (
        <div className={border}>
          <div className="w-full">
            <div className="text-gray-500 text-lg font-light">
              Reserve Price
            </div>
            <div className="flex flex-col">
              <PricingString
                pricing={auction.amount}
                showUSD={false}
                className={{
                  amount: "text-black text-3xl",
                  usd: "text-gray-500 text-sm font-light",
                }}
              />
            </div>
          </div>
          <Link
            href={`/assets/ETHEREUM/${nft?.nft?.contract.address}/${nft?.nft?.tokenId}/bid`}
          >
            <a className="bg-black mt-4 text-white flex items-center justify-around h-12 rounded-md w-full">
              Place Bid
            </a>
          </Link>
        </div>
      );
  };

  return (
    <Fragment>
      {askView()}
      {auctionView()}
    </Fragment>
  );
};

export default NFTMarketView;
