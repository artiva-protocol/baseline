import React, { Fragment, useContext } from "react";
import { NFTContractObject, Post, PostTypeEnum } from "@artiva/shared";
import NFTPreview from "../nft/NFTPreview";
import NFTContractPreview from "../nftContract/NFTContractPreview";
import ThemeContext from "../context/ThemeContext";
import { NFTObject } from "@zoralabs/nft-hooks";

const PostComponent = ({ post }: { post: Post }) => {
  const { type } = post;
  const {
    hooks,
    components: { Link },
  } = useContext(ThemeContext)!;
  const { data } = hooks.usePostContent(post);

  let postContent = () => {
    if (!data) return <Fragment />;
    switch (type) {
      case PostTypeEnum.NFT:
        return <NFTPreview nft={data as NFTObject} />;
      case PostTypeEnum.NFT_CONTRACT:
        return <NFTContractPreview contract={data as NFTContractObject} />;
      default:
        return <Fragment />;
    }
  };

  return (
    <Link href={`/post/${post.id}`}>
      <a>{postContent()}</a>
    </Link>
  );
};

export default PostComponent;
