import { NFTObject } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";
import NFTMarketView from "./NFTMarketView";
import { useRouter } from "next/router";
import { useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { EditionContractLike } from "@artiva/shared";

export const NFTFullView = ({
  nft,
  edition,
}: {
  nft?: NFTObject;
  edition?: EditionContractLike;
}) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { components } = useContext(ThemeContext)!;
  const { NFTRenderer, AddressView } = components;

  return (
    <div className="w-full bg-gray-100">
      <div
        style={{ height: "90vh" }}
        className="py-14 flex items-center justify-around relative"
      >
        {nft ? (
          <NFTRenderer
            nft={nft}
            renderingContext={"FULL"}
            className={`h-full w-auto object-scale-down ${
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

      <div className="grid gap-6 grid-cols-2 px-32 pt-8 bg-white">
        <div>
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
                <button
                  onClick={() => {
                    router.push(
                      `/assets/ETHEREUM/${nft?.nft?.contract.address}`
                    );
                  }}
                  className="bg-black text-white rounded-md text-center inline-block px-4 py-1 mt-1"
                >
                  {nft?.nft?.contract.name}
                </button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="font-light text-gray-500 text-sm">Description</div>
            <h3 className="mt-1 text-lg text-gray-600 w-full break-all whitespace-pre-wrap">
              {nft?.metadata?.description}
            </h3>
          </div>
        </div>
        <div>
          <NFTMarketView nft={nft} edition={edition} />
        </div>
      </div>
    </div>
  );
};

export default NFTFullView;
