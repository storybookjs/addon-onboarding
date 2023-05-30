import ReactConfetti from "react-confetti";
import React, { useEffect, useRef } from "react";
import { styled } from "@storybook/theming";
import { createPortal } from "react-dom";
import { useState } from "react";

interface ConfettiProps
  extends Omit<React.ComponentProps<typeof ReactConfetti>, "drawShape"> {
  top: number;
  left: number;
  width: number;
  height: number;
}

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
  const [confettiContainer] = useState(() => {
    const container = document.createElement("div");
    container.setAttribute("id", "confetti-container");
    container.setAttribute(
      "style",
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;"
    );

    return container;
  });

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
