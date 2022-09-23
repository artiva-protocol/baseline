import React from "react";
import { Platform } from "@artiva/shared";

const Footer = ({ platform }: { platform: Platform }) => {
  return (
    <div>
      <div className="text-sm mt-20 px-6 pt-4 border-t dark:border-gray-700 flex items-center justify-between">
        <div className="text-black dark:text-white">
          {platform.title}{" "}
          <span className="text-gray-400">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-gray-400">Powered by Artiva</div>
      </div>
    </div>
  );
};

export default Footer;
