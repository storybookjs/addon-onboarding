import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { WelcomeModal } from "./WelcomeModal";

const meta: Meta<typeof WelcomeModal> = {
  component: WelcomeModal,
  decorators: [
    (storyFn) => (
      <div style={{ width: "1200px", height: "800px" }}>{storyFn()}</div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
