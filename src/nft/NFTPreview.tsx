import { NFTObject } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const NFTPreview = ({ nft }: { nft?: NFTObject }) => {
  const { components, hooks } = useContext(ThemeContext)!;
  const { AvatarView, AddressView, CountdownDisplay, NFTRenderer } = components;
  const { useFindAuction, useFindAsk } = hooks;
  const auction = useFindAuction(nft);
  const ask = useFindAsk(nft);

  const auctionComponent = () => {
    if (!auction) <Fragment />;
    if (auction?.currentBid) {
      const amount = parseFloat(
        auction.currentBid.amount.amount.value.toFixed(4)
      ).toString();
      return (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-300">Current bid</div>
            <div className="text-lg text-white font-semibold">
              {`${amount} ${auction.currentBid.amount.symbol}`}
            </div>
          </div>

          {auction.endsAt && (
            <div>
              <div className="text-sm text-gray-300">Ends in</div>
              <div className="text-lg text-white font-semibold">
                <CountdownDisplay to={auction.endsAt.timestamp} />
              </div>
            </div>
          )}
        </div>
      );
    }

    if (auction?.amount) {
      const amount = parseFloat(
        auction.amount.amount.value.toFixed(4)
      ).toString();
      return (
        <Fragment>
          <div className="text-sm text-gray-300">Reserve</div>
          <div className="text-lg text-white font-semibold">
            {`${amount} ${auction.amount.symbol}`}
          </div>
        </Fragment>
      );
    }
  };

  const askComponent = () => {
    if (!ask) <Fragment />;
    if (ask?.amount) {
      return (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-300">Buy now</div>
            <div className="text-lg text-white font-semibold">
              {`${ask.amount.amount.value} ${ask.amount.symbol}`}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="shadow-sm rounded-md">
      <div className="relative w-full cursor-pointer h-[80vh] text-left">
        <div className="opacity-0 hover:opacity-100 transition-opacity bg-black/[.6] absolute top-0 left-0 z-30 w-full h-full rounded-md overflow-none">
          <div className="z-20 text-white absolute top-0 left-0 w-full p-5">
            <h2 className="text-4xl font-semibold">{nft?.metadata?.name}</h2>
            <div className="bg-black/[.4] text-white rounded-md text-center inline-block px-4 py-1 mt-4">
              {nft?.nft?.contract.name}
            </div>
            <h3 className="mt-6 text-lg font-light text-gray-300">
              {(nft?.metadata?.description?.length || 0) > 200
                ? `${nft?.metadata?.description?.slice(0, 200)}...`
                : nft?.metadata?.description}
            </h3>
          </div>

          <div className="absolute bottom-5 left-0 w-full text-white">
            {nft?.nft?.minted?.address && (
              <div className="flex pl-5  pt-5 items-center">
                <AvatarView
                  address={nft?.nft?.minted.address}
                  className="rounded-full w-6 h-6"
                />
                <AddressView
                  address={nft?.nft?.minted.address}
                  className="text-md text-gray-300 ml-2"
                />
              </div>
            )}
            {nft && (
              <Fragment>
                <div className="px-5 mt-4">{auctionComponent()}</div>
                <div className="px-5 mt-4">{askComponent()}</div>
              </Fragment>
            )}
          </div>
        </div>

        {nft ? (
          <NFTRenderer
            nft={nft}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full rounded-t-md animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default NFTPreview;
