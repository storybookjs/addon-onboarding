import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ContentWrapper, StyledOverlay } from "./Modal.styled";

type ContentProps = React.ComponentProps<typeof ContentWrapper>;

interface ModalProps
  extends Omit<React.ComponentProps<typeof Dialog.Root>, "children"> {
  width?: number;
  height?: number;
  children: (props: {
    Title: typeof Dialog.Title;
    Description: typeof Dialog.Description;
    Close: typeof Dialog.Close;
  }) => React.ReactNode;
  onEscapeKeyDown?: ContentProps["onEscapeKeyDown"];
  onInteractOutside?: ContentProps["onInteractOutside"];
}

export const initial = { opacity: 0 };
export const animate = { opacity: 1, transition: { duration: 0.3 } };
export const exit = { opacity: 0, transition: { duration: 0.3 } };

export function Modal({
  children,
  width,
  height,
  onEscapeKeyDown,
  onInteractOutside = (ev) => ev.preventDefault(),
  ...rootProps
}: ModalProps) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <StyledOverlay />
        </Dialog.Overlay>
        <ContentWrapper
          width={width}
          height={height}
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
