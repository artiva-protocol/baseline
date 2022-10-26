import { Platform } from "@artiva/shared";
import { CustomPropertiesType, DefaultCustomProps } from "../../artiva.config";

const useCustomProperties = ({
  platform,
}: {
  platform: Platform;
}): CustomPropertiesType => {
  return {
    ...DefaultCustomProps,
    ...platform.custom,
  };
};

export default useCustomProperties;
