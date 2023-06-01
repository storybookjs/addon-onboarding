import React from "react";
import { Icons } from "@storybook/components";
import {
  ListItemContentWrapper,
  ListItemIndexWrapper,
  ListItemWrapper,
} from "./ListItem.styled";

interface ListItemProps {
  children: React.ReactNode;
  index: number;
  isCompleted?: boolean;
}

export const ListItem = ({ children, index, isCompleted }: ListItemProps) => {
  return (
    <ListItemWrapper>
      <ListItemIndexWrapper
        aria-label={isCompleted ? "complete" : "not complete"}
        isCompleted={isCompleted}
      >
        {isCompleted ? (
          <Icons width={10} height={10} icon="check" color="white" />
        ) : (
          index
        )}
      </ListItemIndexWrapper>
      <ListItemContentWrapper>{children}</ListItemContentWrapper>
    </ListItemWrapper>
  );
};
