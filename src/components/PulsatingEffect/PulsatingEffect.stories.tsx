import { Meta, StoryObj } from "@storybook/react";
import { PulsatingEffect } from "./PulsatingEffect";
import React from "react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof PulsatingEffect> = {
  component: PulsatingEffect,
  parameters: {
    layout: "centered",
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <PulsatingEffect targetSelector="#the-button" />
      <button
        id="the-button"
        style={{
          borderRadius: 20,
          border: "1px solid #c9c9ff",
          padding: 6,
        }}
      >
        I should be pulsating
      </button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);
    const button = canvas.getByRole("button");
    await expect(button).toHaveStyle(
      "animation: 3s ease-in-out 0s infinite normal none running pulsate"
    );
  },
};
