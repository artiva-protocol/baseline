import React, { Fragment, useContext } from "react";
import { Post, PostTypeEnum } from "@artiva/shared";
import NFTPreview from "../nft/NFTPreview";
import NFTContractPreview from "../nftContract/NFTContractPreview";
import { useRouter } from "next/router";
import ThemeContext from "../../context/ThemeContext";

const PostComponent = ({ post }: { post: Post }) => {
  const { type, content } = post;
  const { hooks } = useContext(ThemeContext)!;
  const { nft, nftContract } = hooks.usePostContent(type, content);
  const router = useRouter();

  const onClick = () => {
    router.push(`/post/${post.id}`);
  };

  let postContent = () => {
    switch (type) {
      case PostTypeEnum.NFT:
        return <NFTPreview nft={nft} />;
      case PostTypeEnum.NFT_CONTRACT:
        return nftContract ? (
          <NFTContractPreview contract={nftContract} />
        ) : (
          <Fragment />
        );
      default:
        return <Fragment />;
    }
  };

  return (
    <button onClick={onClick}>
      <a>{postContent()}</a>
    </button>
  );
};

export default PostComponent;
