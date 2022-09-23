import React from "react";
import Header from "../components/Header";
import NFTFullView from "../nft/NFTFullView";
import GlobalProvider from "../context/GlobalProvider";
import { NFTProps } from "@artiva/shared";

const NFT = ({ ctx, nft, platform }: NFTProps) => {
  return (
    <GlobalProvider ctx={ctx} platform={platform}>
      <div className="mb-20">
        <Header
          navigation={platform?.navigation || []}
          logo={platform?.logo}
          title={platform?.title}
        />
        <div className="w-full h-full">
          <NFTFullView nft={nft} />
        </div>
      </div>
    </GlobalProvider>
  );
};

export default NFT;
