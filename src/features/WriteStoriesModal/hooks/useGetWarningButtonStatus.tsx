import { useState, useEffect } from "react";
import { Response } from "../../../types/response";
import { API, AddonStore } from "@storybook/manager-api";
import {
  STORY_INDEX_INVALIDATED,
  STORY_RENDERED,
} from "@storybook/core-events";

export const useGetWarningButtonStatus = (
  active: boolean,
  api: API,
  addonsStore: AddonStore
) => {
  const [status, setStatus] = useState<Response<boolean>>(null);

  useEffect(() => {
    if (active) {
      const getWarningButtonStatus = () => {
        addonsStore.getChannel().once(STORY_RENDERED, () => {
          const out = api.getData("example-button--warning");

          if (out) {
            setStatus({ data: true, error: null });
          } else {
            setStatus({ data: false, error: null });
          }
        });
      };

      // If the story already exists, we don't need to listen to any events
      if(api.getData("example-button--warning")) {
        setStatus({ data: true, error: null });
      } else {
        // This should probably be changed to getChannel but we'll keep for backwards compatibility in case people end up using this addon with Storybook 7.0.0 and not 7.1.0
        addonsStore
          .getServerChannel()
          .on(STORY_INDEX_INVALIDATED, getWarningButtonStatus);
      }

      return () => {
        addonsStore
          .getServerChannel()
          .off(STORY_INDEX_INVALIDATED, getWarningButtonStatus);
      };
    }
  }, [active]);

  return status;
};
