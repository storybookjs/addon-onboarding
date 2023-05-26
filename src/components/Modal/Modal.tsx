import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ContentWrapper,
  StyledClose,
  StyledDescription,
  StyledOverlay,
  StyledTitle,
} from "./Modal.styled";

type ContentProps = React.ComponentProps<typeof ContentWrapper>;

interface ModalProps
  extends Omit<React.ComponentProps<typeof Dialog.Root>, "children"> {
  width?: string;
  children: (props: {
    Title: typeof StyledTitle;
    Description: typeof StyledDescription;
    Close: typeof StyledClose;
  }) => React.ReactNode;
  onEscapeKeyDown?: ContentProps["onEscapeKeyDown"];
  onInteractOutside?: ContentProps["onInteractOutside"];
}

export function Modal({
  children,
  width,
  onEscapeKeyDown,
  onInteractOutside = (ev) => ev.preventDefault(),
  ...rootProps
}: ModalProps) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Portal>
        <StyledOverlay />
        <ContentWrapper
          width={width}
          onInteractOutside={onInteractOutside}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          {children({
            Title: StyledTitle,
            Description: StyledDescription,
            Close: StyledClose,
          })}
        </ContentWrapper>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
