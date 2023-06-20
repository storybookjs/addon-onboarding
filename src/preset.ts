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
    const { version: addonVersion } = require("../package.json");

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
