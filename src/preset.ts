import { CoreConfig, Options } from "@storybook/types";
import type { Channel } from "@storybook/channels";
import { STORYBOOK_ADDON_ONBOARDING_CHANNEL } from "./constants";
import { telemetry } from "@storybook/telemetry";

type Event = {
  type: "telemetry";
  step: string;
  payload?: any;
};

export const experimental_serverChannel = async (
  channel: Channel,
  options: Options
) => {
  const { disableTelemetry } = await options.presets.apply<CoreConfig>(
    "core",
    {}
  );

  if (!disableTelemetry) {
    // To prevent prebundling a variable is used to require the package.json
    const packageJsonPath = "../package.json";
    const { version: addonVersion } = require(packageJsonPath);

    channel.on(
      STORYBOOK_ADDON_ONBOARDING_CHANNEL,
      ({ type, ...event }: Event) => {
        if (type === "telemetry") {
          telemetry("addon-onboarding" as any, {
            ...event,
            addonVersion,
          });
        }
      }
    );
  }

  return channel;
};
