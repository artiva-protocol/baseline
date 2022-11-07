import React, { useContext } from "react";
import { Navigation } from "@artiva/shared";
import ThemeContext from "../context/ThemeContext";

const Header = ({
  navigation,
  logo,
  title,
}: {
  navigation: Navigation[];
  logo?: string;
  title: string;
}) => {
  const { components } = useContext(ThemeContext)!;
  const { Nav, ConnectButton, CustomConnectButton, Image, Link } = components;

  return (
    <div
      className={`top-4 px-4 sm:px-10 flex items-center justify-between w-full py-8 border border-b`}
    >
      <div className="flex items-center">
        <Link href={"/"}>
          <a>
            {logo ? (
              <Image
                src={logo}
                alt="logo"
                className="w-full h-8 mr-10 cursor-pointer object-scale-down"
                height={600}
                width={1200}
              />
            ) : (
              <div className="font-semibold text-xl text-gray-800 mr-10">
                {title}
              </div>
            )}
          </a>
        </Link>
        {navigation && (
          <Nav
            className={`text-gray-800 dark:text-white mr-10`}
            navigation={navigation}
          />
        )}
      </div>
      <div className="text-center">
        {ConnectButton && (
          <ConnectButton>
            {(props: any) => (
              <CustomConnectButton
                {...props}
                forceChain={false}
                className="flex item-center justify-around border border-gray-400 text-gray-500 w-40 rounded-md text-center"
              />
            )}
          </ConnectButton>
        )}
      </div>
    </div>
  );
};

export default Header;
