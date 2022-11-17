import { PlatformThemeType } from "@artiva/shared";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import ThemeContext from "../context/ThemeContext";
const PostPreview = dynamic(() => import("../post/PostPreview"), {
  ssr: false,
});

const TagFullView = ({
  tag,
  platform,
}: {
  tag: string;
  platform: PlatformThemeType;
}) => {
  const { hooks } = useContext(ThemeContext)!;
  const { useInfinitePosts, useTagData } = hooks;

  const { data: tagData } = useTagData({
    platform: platform.id,
    tag,
  });
  const { data, loaderElementRef } = useInfinitePosts({
    platform: platform.id,
    limit: 21,
    tag,
  });
  const posts = data?.flat();

  return (
    <div className="pb-20">
      <div className="pl-10 my-20">
        <div>{tagData ? tagData.count : "..."} NFTs</div>
        <div className="text-7xl font-semibold mt-1">{tag}</div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 mx-6 mt-6">
        {posts?.map((x: any) => (
          <PostPreview post={x} />
        ))}
      </div>
      <div ref={loaderElementRef} />
      <Footer platform={platform} />
    </div>
  );
};

export default TagFullView;
