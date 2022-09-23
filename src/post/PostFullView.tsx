import React, { Fragment, useContext } from "react";
import { Post, PostTypeEnum } from "@artiva/shared";
import NFTFullView from "../nft/NFTFullView";
import NFTContractFullView from "../nftContract/NFTContractFullView";
import ThemeContext from "../context/ThemeContext";

const PostFullView = ({ post }: { post: Post }) => {
  const { type, content } = post;
  const { hooks } = useContext(ThemeContext)!;
  const { nft, nftContract } = hooks.usePostContent(type, content);

  let postContent = () => {
    switch (type) {
      case PostTypeEnum.NFT:
        return <NFTFullView nft={nft} />;
      case PostTypeEnum.NFT_CONTRACT:
        return nftContract ? (
          <NFTContractFullView contract={nftContract} />
        ) : (
          <Fragment />
        );
      default:
        return <Fragment />;
    }
  };

  return postContent();
};

export default PostFullView;
