import { ThemeConfig } from "@artiva/shared";

export type CustomPropertiesType = {
  show_platform_cover: boolean;
  show_logo_in_navigation: boolean;
  header_style: "Center aligned" | "Left aligned" | "Hidden";
  connect_wallet_text: string;
  color_scheme: "Light" | "Dark" | "Auto";
};

const config: ThemeConfig = {
  name: "baseline",
  version: "1.0.0",
  engines: {
    artiva: "0.1.0",
  },
  custom: {
    color_scheme: {
      type: "select",
      options: ["Light", "Dark", "Auto"],
      default: "Light",
    },
    connect_wallet_text: {
      type: "text",
      default: "Connect Wallet",
    },
    show_platform_cover: {
      type: "boolean",
      default: true,
      group: "homepage",
    },
    header_style: {
      type: "select",
      options: ["Center aligned", "Left aligned", "Hidden"],
      default: "Center aligned",
      group: "homepage",
    },
    show_logo_in_navigation: {
      type: "boolean",
      default: false,
      group: "homepage",
    },
  },
};

let tmp = {};
Object.keys(config.custom).map((x) => {
  (tmp as any)[x] = config.custom[x].default;
});

export const DefaultCustomProps = { ...tmp } as CustomPropertiesType;

export default config;
