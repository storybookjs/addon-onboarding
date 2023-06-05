import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
  decorators: [
    (storyFn) => (
      <div style={{ width: "1200px", height: "800px" }}>{storyFn()}</div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);
    return (
      <>
        <Modal open={isOpen}>
          {({ Title, Description, Close }) => (
            <>
              Hello world
              <Title>Modal Title</Title>
              <Description>Modal Description</Description>
              <Close onClick={() => setOpen(false)}>Close</Close>
            </>
          )}
        </Modal>
        <button onClick={() => setOpen(true)}>Open modal</button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);
    const button = canvas.getByText("Open modal");
    await userEvent.click(button);
    await expect(canvas.findByText("Hello world")).resolves.toBeInTheDocument();
  },
};

export const FixedWidth: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);
    return (
      <>
        <Modal width="740px" open={isOpen}>
          {({ Title, Description, Close }) => (
            <>
              Hello world
              <Title>Modal Title</Title>
              <Description>Modal Description</Description>
              <Close onClick={() => setOpen(false)}>Close</Close>
            </>
          )}
        </Modal>
        <button onClick={() => setOpen(true)}>Open modal</button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);
    const button = canvas.getByText("Open modal");
    await userEvent.click(button);
    await expect(canvas.findByText("Hello world")).resolves.toBeInTheDocument();
  },
};
