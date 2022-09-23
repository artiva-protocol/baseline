import { NFTObject } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import ThemeContext from "../context/ThemeContext";
import { EditionContractLike } from "@artiva/shared";

const NFTMarketView = ({
  nft,
  edition,
}: {
  nft?: NFTObject;
  edition?: EditionContractLike;
}) => {
  const router = useRouter();

  const { components, hooks } = useContext(ThemeContext)!;
  const { PricingString, CountdownDisplay, PrimarySalePurchaseButton } =
    components;
  const { useFindAuction, useFindAsk } = hooks;

  const auction = useFindAuction(nft);
  const ask = useFindAsk(nft);

  const border = "flex flex-col border border-gray-200 rounded-3xl p-6";

  const editionView = () => {
    if (!edition) return <Fragment />;
    return (
      <div className={border}>
        <div className="text-gray-500 text-lg font-light">Price</div>
        <div className="flex flex-col">
          <span className="text-black text-3xl">
            {edition.salesConfig.publicSalePrice} ETH
          </span>
        </div>
        <PrimarySalePurchaseButton
          primarySale={edition}
          address={nft?.nft?.contract.address || ""}
          quantity={1}
          className="bg-black mt-4 text-white w-full flex items-center justify-around h-12 rounded-md w-full"
        >
          Mint
        </PrimarySalePurchaseButton>
        <div className="mt-4 w-full flex text-gray-400 justify-around">
          <div className="flex items-baseline">
            <span className="mr-2">
              <CountdownDisplay
                to={parseInt(edition.salesConfig.publicSaleEnd!)}
              />
            </span>
            <span>left</span>
          </div>
        </div>
      </div>
    );
  };

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
        <button
          onClick={() => {
            router.push(router.asPath + "/buy");
          }}
          className="bg-black mt-4 text-white w-full flex items-center justify-around h-12 rounded-md w-full"
        >
          Buy Now
        </button>
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
          <button
            onClick={() => {
              router.push(router.asPath + "/bid");
            }}
            className="bg-black mt-4 text-white w-full flex items-center justify-around h-12 rounded-md w-full"
          >
            Place Bid
          </button>
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
          <button
            onClick={() => {
              router.push(router.asPath + "/bid");
            }}
            className="bg-black mt-4 text-white w-full flex items-center justify-around h-12 rounded-md w-full"
          >
            Place Bid
          </button>
        </div>
      );
  };

  return (
    <Fragment>
      {askView()}
      {auctionView()}
      {editionView()}
    </Fragment>
  );
};

export default NFTMarketView;
