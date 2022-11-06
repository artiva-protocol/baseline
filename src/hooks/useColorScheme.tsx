import { Platform } from "@artiva/shared";
import { useEffect, useRef } from "react";
import useCustomProperties from "./useCustomProperties";

const useColorScheme = ({ platform }: { platform: Platform }) => {
  const parentRef = useRef<HTMLDivElement>();
  const custom = useCustomProperties({ platform });

  useEffect(() => {
    if (!parentRef.current) return;
    if (
      custom.color_scheme === "Dark" ||
      (custom.color_scheme === "Auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      parentRef.current.classList.add("dark");
      document.body.style.backgroundColor = "black";
    } else {
      parentRef.current.classList.remove("dark");
      document.body.style.backgroundColor = "white";
    }
  }, [custom.color_scheme, parentRef]);

  return { parentRef };
};

export default useColorScheme;
