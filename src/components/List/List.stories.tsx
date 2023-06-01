import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { List } from "./List";
import { ListItem } from "./ListItem/ListItem";

const meta: Meta<typeof List> = {
  component: List,
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [workingIndex, setWorkingIndex] = useState(1);

    return (
      <>
        <List>
          <ListItem isCompleted={workingIndex >= 1} nthItem={1}>
            Hello World
          </ListItem>
          <ListItem isCompleted={workingIndex >= 2} nthItem={2}>
            Bonjour le monde
          </ListItem>
          <ListItem isCompleted={workingIndex >= 3} nthItem={3}>
            你好, 世界
          </ListItem>
        </List>
        <br />
        <button type="button" onClick={() => setWorkingIndex(workingIndex + 1)}>
          Complete
        </button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement);
    const button = canvas.getByText("Complete");

    expect(canvas.getAllByLabelText("complete")).toHaveLength(1);

    userEvent.click(button);

    await waitFor(() =>
      expect(canvas.getAllByLabelText("complete")).toHaveLength(2)
    );
  },
};
