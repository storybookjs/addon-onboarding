import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { WriteStoriesModal } from "./WriteStoriesModal";

const meta: Meta<typeof WriteStoriesModal> = {
  component: WriteStoriesModal,
  decorators: [
    (storyFn) => (
      <div style={{ width: "1200px", height: "800px" }}>{storyFn()}</div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
