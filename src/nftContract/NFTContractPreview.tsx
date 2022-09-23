import React, { useContext } from "react";
import {
  ChainIdentifier,
  NFTIdentifier,
  NFTContractObject,
} from "@artiva/shared";
import { NFTObject } from "@zoralabs/nft-hooks";
import ThemeContext from "../context/ThemeContext";

const NFTContractPreview = ({ contract }: { contract: NFTContractObject }) => {
  const { collection, aggregateStat } = contract;
  const identifier: NFTIdentifier = {
    chain: collection?.networkInfo?.network as ChainIdentifier,
    contractAddress: collection?.address,
    tokenId: "1",
  };
  const { hooks, components } = useContext(ThemeContext)!;
  const { useNFT } = hooks;
  const { NFTRenderer } = components;
  const { data: nft } = useNFT(identifier);

  return (
    <div className="h-[80vh] relative">
      <div className="absolute bg-black/[.4] top-5 right-8 z-30 text-white px-4 py-1 text-xs rounded-md">
        {collection?.symbol}
      </div>
      <div className="absolute bottom-12 left-8 z-30 text-white text-left">
        <div className="text-4xl font-semibold">{collection?.name}</div>
        <div className="text-gray-300 mt-2">{aggregateStat?.nftCount} NFTs</div>
      </div>
      {nft && (
        <div className="absolute h-full w-full bg-black/[.4] z-20 rounded-md"></div>
      )}

      {nft && (
        <NFTRenderer
          className="absolute h-full object-cover rounded-md"
          nft={nft as NFTObject}
        />
      )}
    </div>
  );
};

export default NFTContractPreview;
