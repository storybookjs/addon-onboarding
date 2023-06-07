import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { WriteStoriesModal } from "./WriteStoriesModal";
import { waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  STORY_INDEX_INVALIDATED,
  STORY_RENDERED,
} from "@storybook/core-events";

const meta: Meta<typeof WriteStoriesModal> = {
  component: WriteStoriesModal,
  args: {
    api: {
      getData: () => ({ some: "data" }),
    } as any,
    addonsStore: {
      getChannel: () => {
        return {
          once: (type: string, cb: () => void) => {
            if (type === STORY_RENDERED) {
              cb();
            }
          },
        };
      },
      getServerChannel: () => ({
        on: (type: string, cb: () => void) => {
          if (type === STORY_INDEX_INVALIDATED) {
            storyIndexInvalidatedCb = cb;
          }
        },
        off: () => {},
      }),
      getData: () => ({ some: "data" }),
    } as any,
  },
  decorators: [
    (storyFn) => (
      <div style={{ width: "1200px", height: "800px" }}>{storyFn()}</div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

let storyIndexInvalidatedCb: () => void;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const DefaultPlayed: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    const importsText = await canvas.findByText("Imports");
    await expect(importsText).toBeVisible();

    await canvas.getByRole("button", { name: /Next/i }).click();

    const metaText = await canvas.findAllByText("Meta");
    await expect(metaText?.[0]).toBeVisible();

    await canvas.getByRole("button", { name: /Next/i }).click();

    const storyText = await canvas.findAllByText("Story");
    await expect(storyText?.[0]).toBeVisible();

    await canvas.getByRole("button", { name: /Next/i }).click();

    const argsText = await canvas.findAllByText("Args");
    await expect(argsText?.[0]).toBeVisible();

    await canvas.getByRole("button", { name: /Next/i }).click();

    (await canvas.findByRole("button", { name: /Copy code/i })).click();

    await storyIndexInvalidatedCb();

    await waitFor(() =>
      expect(canvas.getAllByLabelText("complete")).toHaveLength(3)
    );
  },
};
