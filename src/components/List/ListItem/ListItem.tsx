import React from "react";
import { Icons } from "@storybook/components";
import {
  ListItemContentWrapper,
  ListItemIndexWrapper,
  ListItemWrapper,
} from "./ListItem.styled";

interface ListItemProps {
  children: React.ReactNode;
  nthItem: number;
  isCompleted?: boolean;
}

export const ListItem = ({ children, nthItem, isCompleted }: ListItemProps) => {
  return (
    <ListItemWrapper>
      <ListItemIndexWrapper
        aria-label={isCompleted ? "complete" : "not complete"}
        isCompleted={isCompleted}
      >
        {isCompleted ? <Icons icon="check" color="white" /> : nthItem}
      </ListItemIndexWrapper>
      <ListItemContentWrapper>{children}</ListItemContentWrapper>
    </ListItemWrapper>
  );
};
