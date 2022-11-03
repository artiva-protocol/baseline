import { NFTObject } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";
import NFTMarketView from "./NFTMarketView";
import { useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { EditionContractLike } from "@artiva/shared";

export const NFTFullView = ({ nft }: { nft?: NFTObject }) => {
  const [loaded, setLoaded] = useState(false);
  const { components } = useContext(ThemeContext)!;
  const { NFTRenderer, AddressView, Link } = components;

  return (
    <div className="w-full bg-gray-100">
      <div className="py-14 px-4 flex items-center justify-around relative h-[55vh] sm:h-[80vh]">
        {nft ? (
          <NFTRenderer
            nft={nft}
            renderingContext={"FULL"}
            className={`h-full w-auto object-contain ${
              loaded ? "shadow-2xl" : ""
            }`}
            onComponentLoaded={() => {
              setLoaded(true);
            }}
          />
        ) : (
          <span className="mediaLoader"></span>
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 px-10 sm:px-32 pt-8 bg-white">
        <div className="w-full">
          <h2 className="text-4xl">{nft?.metadata?.name}</h2>
          <div className="mt-6 flex">
            <div>
              <div className="font-light text-gray-500 text-sm">Created by</div>
              {nft?.nft?.minted.address && (
                <AddressView
                  address={nft?.nft?.minted.address}
                  className="border border-gray-500 rounded-full text-center inline-block px-4 py-1 mt-1"
                />
              )}
            </div>
            {nft?.nft?.contract.name && (
              <div className="ml-8">
                <div className="font-light text-gray-500 text-sm">Contract</div>
                <Link href={`/assets/ETHEREUM/${nft?.nft?.contract.address}`}>
                  <a className="bg-black text-white rounded-md text-center inline-block px-4 py-1 mt-1">
                    {nft?.nft?.contract.name}
                  </a>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="font-light text-gray-500 text-sm">Description</div>
            <h3 className="mt-1 text-lg text-gray-600 w-full break-word whitespace-pre-wrap">
              {nft?.metadata?.description}
            </h3>
          </div>
        </div>
        <div>
          <NFTMarketView nft={nft} />
        </div>
      </div>
    </div>
  );
};

export default NFTFullView;
