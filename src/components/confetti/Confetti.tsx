import ReactConfetti from "react-confetti";
import React, { useEffect } from "react";
import { styled } from "@storybook/theming";
import { createPortal } from "react-dom";

interface ConfettiProps
  extends Omit<React.ComponentProps<typeof ReactConfetti>, "drawShape"> {
  top: number;
  left: number;
  width: number;
  height: number;
}

const confettiContainer = document.createElement("div");
confettiContainer.setAttribute("id", "confetti-container");
confettiContainer.setAttribute(
  "style",
  "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;"
);

const Wrapper = styled.div<{
  width: number;
  height: number;
  top: number;
  left: number;
}>(({ width, height, left, top }) => ({
  width: `${width}px`,
  height: `${height}px`,
  left: `${left}px`,
  top: `${top}px`,
  position: "relative",
  overflow: "hidden",
}));

export function Confetti({
  top = 0,
  left = 0,
  width = window.innerWidth,
  height = window.innerHeight,
  ...confettiProps
}: ConfettiProps) {
  useEffect(() => {
    document.body.appendChild(confettiContainer);

    return () => {
      document.body.removeChild(confettiContainer);
    };
  }, []);

  return createPortal(
    <Wrapper top={top} left={left} width={width} height={height}>
      <ReactConfetti {...confettiProps} />
    </Wrapper>,
    confettiContainer
  );
}
