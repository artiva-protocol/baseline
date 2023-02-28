import React, { useContext, useState } from "react";
import { Navigation } from "@artiva/shared";
import ThemeContext from "../context/ThemeContext";
import MobileNavigation from "./MobileNavigation";
import { Bars3Icon } from "@heroicons/react/24/solid";

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
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className={`px-4 sm:px-10 flex items-center justify-between w-full py-8`}
    >
      {navOpen && (
        <MobileNavigation
          navigation={navigation}
          onClose={() => setNavOpen(false)}
        />
      )}
      <div className="items-center flex">
        <Link href={"/"}>
          <a>
            {logo ? (
              <Image
                src={logo}
                alt="logo"
                className="w-auto h-8 mr-10 cursor-pointer object-scale-down"
                height={600}
                width={600}
              />
            ) : (
              <div className="font-semibold text-xl text-gray-800 dark:text-gray-200 mr-10">
                {title}
              </div>
            )}
          </a>
        </Link>
        <div className="hidden sm:block">
          {navigation && (
            <Nav
              className={`text-gray-800 dark:text-white mr-10`}
              navigation={navigation}
            />
          )}
        </div>
      </div>
      <div className="text-center hidden sm:block">
        {ConnectButton && (
          <ConnectButton>
            {(props: any) => (
              <CustomConnectButton
                {...props}
                forceChain={false}
                className="flex item-center justify-around border border-gray-400 text-gray-500 dark:text-gray-300 w-40 rounded-md text-center"
              />
            )}
          </ConnectButton>
        )}
      </div>
      <button
        onClick={() => setNavOpen(true)}
        className="sm:hidden focus:outline-none"
      >
        <Bars3Icon className="h-8 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default Header;
