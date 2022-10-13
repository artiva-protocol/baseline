import React from "react";
import PostFullView from "../post/PostFullView";
import Header from "../components/Header";
import GlobalProvider from "../context/GlobalProvider";
import { PostProps } from "@artiva/shared";

const PostComponent = ({ ctx, post, platform }: PostProps) => {
  return (
    <GlobalProvider ctx={ctx} platform={platform}>
      <div className="mb-20">
        <Header
          navigation={platform?.navigation || []}
          logo={platform?.logo}
          title={platform?.title}
        />
        <div className="w-full h-full">
          {post && <PostFullView post={post} />}
        </div>
      </div>
    </GlobalProvider>
  );
};

export default PostComponent;
