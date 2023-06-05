import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ContentWrapper, StyledOverlay } from "./Modal.styled";

type ContentProps = React.ComponentProps<typeof ContentWrapper>;

interface ModalProps
  extends Omit<React.ComponentProps<typeof Dialog.Root>, "children"> {
  width?: string;
  children: (props: {
    Title: typeof Dialog.Title;
    Description: typeof Dialog.Description;
    Close: typeof Dialog.Close;
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
            Title: Dialog.Title,
            Description: Dialog.Description,
            Close: Dialog.Close,
          })}
        </ContentWrapper>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
