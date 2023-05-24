import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import React, { useLayoutEffect, useState } from "react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const tooltipText = `This awesome tooltip is shifted, because there is not enough room to center it`;

const TooltipTemplate = () => {
  const [buttonRef, setButtonRef] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isOpen, setOpen] = useState(false);

  // Example of how to find a specific element in the DOM and save it to pass it then to the tooltip
  useLayoutEffect(() => {
    const buttonElement = document.getElementById(
      "button"
    ) as HTMLButtonElement;
    setButtonRef(buttonElement);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setOpen((open) => !open);
        }}
        id="button"
      >
        Button
      </button>
      <Tooltip anchorElement={buttonRef} open={isOpen}>
        {tooltipText}
      </Tooltip>
    </div>
  );
};

export const Default: Story = {
  render: () => <TooltipTemplate />,
  // Click on the button element and assert that the tooltip appears
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);

    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await waitFor(() =>
      expect(canvas.getByText(tooltipText)).toBeInTheDocument()
    );
  },
};
