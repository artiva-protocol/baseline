import React, { useContext } from "react";
import { Navigation } from "@artiva/shared";
import { useRouter } from "next/router";
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
  const { Nav, ConnectButton, CustomConnectButton, Image } = components;
  const { push } = useRouter();

  return (
    <div
      className={`top-4 px-20 flex items-center justify-between w-full py-4 border border-b`}
    >
      <div className="flex items-center">
        <button
          onClick={() => {
            push("/");
          }}
        >
          {logo ? (
            <Image
              src={logo}
              alt="logo"
              className="w-8 mr-10 cursor-pointer"
              height={600}
              width={600}
            />
          ) : (
            <div className="font-semibold text-gray-800">{title}</div>
          )}
        </button>
        {navigation && Nav}
      </div>
      <div className="text-center">
        {ConnectButton && (
          <ConnectButton>
            {(props: any) => (
              <CustomConnectButton
                {...props}
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
