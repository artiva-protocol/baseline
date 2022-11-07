import { NFTObject } from "@zoralabs/nft-hooks";
import React, { useContext } from "react";
import NFTMarketView from "./NFTMarketView";
import ThemeContext from "../context/ThemeContext";
import { useRouter } from "next/router";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export const NFTFullView = ({ nft }: { nft?: NFTObject }) => {
  const { components } = useContext(ThemeContext)!;
  const { NFTRenderer, AddressView, Link, AvatarView } = components;
  const {
    query: { platform },
  } = useRouter();
  const contractAddress = nft?.nft?.contract.address;

  return (
    <div className="w-full bg-gray-100">
      <div className="py-14 px-4 flex items-center justify-around relative h-full sm:h-[80vh]">
        {nft ? (
          <NFTRenderer
            nft={nft}
            renderingContext={"FULL"}
            className={`h-full w-auto object-contain`}
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
              <div className="font-light text-gray-500 text-sm">Minted by</div>
              {nft?.nft?.minted.address && (
                <div className="mt-2 flex items-center">
                  <AvatarView
                    address={nft?.nft?.minted.address}
                    className="rounded-full w-6 h-6"
                  />
                  <AddressView
                    address={nft?.nft?.minted.address}
                    className="text-md text-gray-700 ml-2"
                  />
                </div>
              )}
            </div>
            {nft?.nft?.contract.name && (
              <div className="ml-8">
                <div className="font-light text-gray-500 text-sm">Contract</div>
                <Link href={`/assets/ETHEREUM/${nft?.nft?.contract.address}`}>
                  <a className="bg-black text-white text-md rounded-md text-center inline-block px-4 py-1 mt-1">
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

          <div className="mt-6 font-light text-gray-500 text-sm">Post Info</div>

          <div className="mt-1 grid grid-cols-1 gap-2 border-l border-r rounded-md border-gray-300">
            <a
              href={`https://polygonscan.com/address/${platform}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-t border-gray-300 rounded-md p-2 px-4">
                <div className="text-xs text-gray-400 mt-1">
                  Platform Address
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">{`${platform?.slice(
                    0,
                    6
                  )}...${platform?.slice(
                    platform?.length - 6,
                    platform?.length
                  )}`}</div>
                  <ArrowTopRightOnSquareIcon className="h-4" />
                </div>
              </div>
            </a>
            <a
              href={`https://etherscan.io/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-t border-gray-300 rounded-md p-2 px-4">
                <div className="text-xs text-gray-400 mt-1">NFT Address</div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">{`${contractAddress?.slice(
                    0,
                    6
                  )}...${contractAddress?.slice(
                    contractAddress?.length - 6,
                    contractAddress?.length
                  )}`}</div>
                  <ArrowTopRightOnSquareIcon className="h-4" />
                </div>
              </div>
            </a>
            <div className="border-t border-b pb-4 border-gray-300 rounded-md p-2 px-4">
              <div className="text-xs text-gray-400 mt-1">NFT Blockchain</div>
              <div className="text-gray-700">{"ETHEREUM"}</div>
            </div>
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
