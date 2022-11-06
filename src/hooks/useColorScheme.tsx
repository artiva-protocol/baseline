import { Platform } from "@artiva/shared";
import { useEffect, useRef } from "react";
import useCustomProperties from "./useCustomProperties";
import { useRouter } from "next/router";

const useColorScheme = ({ platform }: { platform: Platform }) => {
  const parentRef = useRef<HTMLDivElement>();
  const custom = useCustomProperties({ platform });
  const { asPath } = useRouter();

  useEffect(() => {
    if (!parentRef.current) return;
    const isDark =
      custom.color_scheme === "Dark" ||
      (custom.color_scheme === "Auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) parentRef.current.classList.add("dark");
    else parentRef.current.classList.remove("dark");

    console.log("router", asPath);

    if (isDark && asPath === "/") document.body.style.backgroundColor = "black";
    else document.body.style.backgroundColor = "white";
  }, [custom.color_scheme, parentRef, asPath]);

  return { parentRef };
};

export default useColorScheme;
