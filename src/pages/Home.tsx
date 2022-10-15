import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { HomeProps } from "@artiva/shared";
import GlobalProvider from "../context/GlobalProvider";
import { CustomPropertiesType } from "../../artiva.config";
import Footer from "../components/Footer";

const PostPreview = dynamic(() => import("../post/PostPreview"), {
  ssr: false,
});

const Home = ({ ctx, platform }: HomeProps) => {
  const { usePosts } = ctx.hooks;
  const { Nav, ConnectButton, CustomConnectButton, Image } = ctx.components;
  const custom: CustomPropertiesType = platform.custom as any;

  const headerStyles = () => {
    switch (custom.header_style) {
      case "Center aligned":
        return "items-center justify-around";
      case "Left aligned":
        return "items-end justify-left";
      case "Hidden":
        return "hidden";
    }
  };

  const { data: posts } = usePosts({ featured: true });

  const showingCover = custom.show_platform_cover && platform.cover_image;

  return (
    <GlobalProvider ctx={ctx} platform={platform}>
      <div className="pb-20 bg-white dark:bg-black">
        <div
          className="relative"
          style={{ height: showingCover ? "80vh" : "60vh" }}
        >
          <div className="absolute z-30 top-0 py-8 px-10 flex items-center justify-between w-full">
            <div className="flex items-baseline">
              {custom.show_logo_in_navigation && (
                <Fragment>
                  {platform?.logo ? (
                    <Image
                      alt="logo"
                      className="w-10 h-10 mr-10"
                      src={platform?.logo}
                      width={300}
                      height={300}
                    />
                  ) : (
                    <h1
                      className={`${
                        showingCover
                          ? "text-white"
                          : "text-black dark:text-white"
                      } text-2xl mr-10 font-semibold`}
                    >
                      {platform?.title}
                    </h1>
                  )}
                </Fragment>
              )}
              {platform?.navigation && (
                <Nav
                  className={`${
                    showingCover
                      ? "text-gray-800"
                      : "text-gray-800 dark:text-white"
                  } text-lg mr-10`}
                  navigation={platform?.navigation}
                />
              )}
            </div>
            <div className="text-center">
              {ConnectButton && (
                <ConnectButton>
                  {(props: any) => (
                    <CustomConnectButton
                      {...props}
                      connectWalletText={custom.connect_wallet_text}
                      className={`${
                        showingCover
                          ? "text-white border-white"
                          : "text-black border-black dark:text-white dark:border-white"
                      } border w-40 h-8 rounded-md`}
                    />
                  )}
                </ConnectButton>
              )}
            </div>
          </div>

          <Fragment>
            <div
              className={`absolute z-20 text-white p-6 px-10 h-full w-full flex ${headerStyles()}`}
            >
              <div className={`text-center flex flex-col items-center`}>
                {!custom.show_logo_in_navigation && (
                  <Fragment>
                    {platform?.logo ? (
                      <Image
                        alt="logo"
                        className="w-28 h-28"
                        src={platform?.logo}
                        width={600}
                        height={600}
                      />
                    ) : (
                      <h1
                        className={`${
                          showingCover
                            ? "text-white"
                            : "text-black dark:text-white"
                        } text-5xl font-semibold`}
                      >
                        {platform?.title}
                      </h1>
                    )}
                  </Fragment>
                )}
                <h2
                  className={`${
                    showingCover ? "text-white" : "text-black dark:text-white"
                  } text-2xl font-extralight mt-6`}
                >
                  {platform?.description}
                </h2>
              </div>
            </div>
            {platform?.cover_image && showingCover && (
              <Image
                src={platform?.cover_image}
                alt="cover"
                className="object-cover w-full absolute h-full"
                width={2000}
                height={2000}
              />
            )}
          </Fragment>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-6 mt-6">
          {posts?.map((x: any) => (
            <PostPreview post={x} />
          ))}
        </div>
        <Footer platform={platform} />
      </div>
    </GlobalProvider>
  );
};

export default Home;
