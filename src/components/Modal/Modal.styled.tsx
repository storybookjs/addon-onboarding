import { css, styled } from "@storybook/theming";
import {
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import React from "react";
import { Icons } from "@storybook/components";

export const StyledOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  inset: 0px;
  width: 100%;
  height: 100%;
})`;

export const StyledContent = styled.div<{ width: string }>(
  ({ width }) => css`
    background-color: white;
    border-radius: 6px;
    box-shadow: rgba(14, 18, 22, 0.35) 0px 10px 38px -10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${width ?? "calc(100% - 40px)"};
    max-width: calc(100% - 40px);
    max-height: 85vh;
  `
);

export const ContentWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof StyledContent> &
    React.ComponentProps<typeof Content>
>(({ width, children, ...contentProps }, ref) => (
  <Content ref={ref} asChild {...contentProps}>
    <StyledContent width={width}>{children}</StyledContent>
  </Content>
));

export const StyledTitle = styled(Title)`
  color: #000;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;
export const StyledDescription = styled(Description)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #454e54;
`;

const CloseButton = ({ ...props }: any) => {
  return (
    <Close {...props}>
      {props.children}
      <Icons icon="arrowright" style={{ marginLeft: 2 }} height={10} />
    </Close>
  );
};
export const StyledClose = styled(CloseButton)`
  all: unset;
  cursor: pointer;
  font-size: 13px;
  color: #798186;
`;
