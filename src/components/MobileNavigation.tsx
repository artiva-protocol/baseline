import { Navigation } from "@artiva/shared";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const MobileNavigation = ({
  navigation,
  onClose,
}: {
  navigation?: Navigation[];
  onClose: () => void;
}) => {
  const {
    components: { Nav, ConnectButton, CustomConnectButton },
  } = useContext(ThemeContext)!;

  return (
    <div className="fixed z-40 top-0 bg-white dark:bg-black text-black dark:text-white left-0 h-screen w-screen py-8">
      <button
        onClick={onClose}
        className="w-full flex items-center justify-end focus:outline-none text-gray-700 dark:text-gray-300 px-8"
      >
        <XMarkIcon className="h-8" />
      </button>
      <div className="flex flex-col text-left">
        <ConnectButton>
          {(props: any) => (
            <CustomConnectButton
              {...props}
              forceChain={false}
              className={`text-2xl text-left text-black dark:text-white border-b dark:border-gray-800 w-full p-8`}
            />
          )}
        </ConnectButton>
        {navigation && (
          <Nav
            className={`text-2xl text-left text-black dark:text-white border-b dark:border-gray-800 w-full p-8`}
            navigation={navigation?.filter((x) => !x.secondary)}
          />
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
