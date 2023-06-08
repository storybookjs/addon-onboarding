import { Meta, StoryObj } from "@storybook/react";
import { Confetti } from "./Confetti";
import React from "react";

const meta: Meta<typeof Confetti> = {
  component: Confetti,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (StoryFn) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <button>I am clickable</button>
        <StoryFn />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Confetti>;

export const FullWidth: Story = {};

export const Positioned: Story = {
  args: {
    top: 100,
    left: 300,
    width: 300,
    height: 250,
  },
};

export const OneTimeConfetti: Story = {
  args: {
    numberOfPieces: 800,
    recycle: false,
    onConfettiComplete: (confetti) => {
      confetti.reset()
    }
  },
};
