import React, { Fragment, useContext } from "react";
import { Post, PostTypeEnum } from "@artiva/shared";
import NFTPreview from "../nft/NFTPreview";
import NFTContractPreview from "../nftContract/NFTContractPreview";
import ThemeContext from "../context/ThemeContext";

const PostComponent = ({ post }: { post: Post }) => {
  const { type, content } = post;
  const {
    hooks,
    components: { Link },
  } = useContext(ThemeContext)!;
  const { nft, nftContract } = hooks.usePostContent(type, content);

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
    <Link href={`/post/${post.id}`}>
      <a>{postContent()}</a>
    </Link>
  );
};

export default PostComponent;
