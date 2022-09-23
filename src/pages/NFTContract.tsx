import React from "react";
import Header from "../components/Header";
import NFTContractFullView from "../nftContract/NFTContractFullView";
import GlobalProvider from "../context/GlobalProvider";
import { NFTContractProps } from "@artiva/shared";

const NFTContract = ({ ctx, nftContract, platform }: NFTContractProps) => {
  return (
    <GlobalProvider ctx={ctx} platform={platform}>
      <div className="mb-20">
        <Header
          navigation={platform?.navigation || []}
          logo={platform?.logo}
          title={platform?.title}
        />
        <div className="w-full h-full">
          {nftContract && <NFTContractFullView contract={nftContract} />}
        </div>
      </div>
    </GlobalProvider>
  );
};

export default NFTContract;
