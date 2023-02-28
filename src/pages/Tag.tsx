import React from "react";
import Header from "../components/Header";
import GlobalProvider from "../context/GlobalProvider";
import { TagProps } from "@artiva/shared";
import TagFullView from "../tag/TagFullView";

const Tag = ({ ctx, tag, platform }: TagProps) => {
  return (
    <GlobalProvider ctx={ctx} platform={platform}>
      <div className="mb-20">
        <Header
          navigation={platform?.navigation || []}
          logo={platform?.logo}
          title={platform?.title}
        />
        <div className="w-full h-full">
          <TagFullView platform={platform} tag={tag} />
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Tag;
