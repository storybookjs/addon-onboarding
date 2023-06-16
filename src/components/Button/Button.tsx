import React, { ComponentProps, FC, forwardRef } from "react";
import { styled } from "@storybook/theming";

export interface ButtonProps extends ComponentProps<"button"> {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  variant?: "primary" | "secondary" | "outline";
}

const StyledButton = styled.button<{ variant: ButtonProps["variant"] }>`
  all: unset;
  box-sizing: border-box;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  background: ${({ theme, variant }) => {
    if (variant === "primary") return theme.color.secondary;
    if (variant === "secondary") return theme.color.lighter;
    if (variant === "outline") return "transparent";
    return theme.color.secondary;
  }};
  color: ${({ theme, variant }) => {
    if (variant === "primary") return theme.color.lightest;
    if (variant === "secondary") return theme.darkest;
    if (variant === "outline") return theme.darkest;
    return theme.color.lightest;
  }};
  box-shadow: ${({ variant }) => {
    if (variant === "primary") return "none";
    if (variant === "secondary") return "#D9E8F2 0 0 0 1px inset";
    if (variant === "outline") return "#D9E8F2 0 0 0 1px inset";
    return "none";
  }};
  height: 32px;
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fonts.base};
  transition: background-color, box-shadow, opacity;
  transition-duration: 0.16s;
  transition-timing-function: ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: ${({ variant }) => {
      if (variant === "primary") return "#0b94eb";
      if (variant === "secondary") return "#eef4f9";
      if (variant === "outline") return "transparent";
      return "#0b94eb";
    }};
  }

  &:focus {
    box-shadow: ${({ variant }) => {
      if (variant === "primary") return "inset 0 0 0 1px rgba(0, 0, 0, 0.2)";
      if (variant === "secondary") return "inset 0 0 0 1px #0b94eb";
      if (variant === "outline") return "inset 0 0 0 1px #0b94eb";
      return "inset 0 0 0 2px rgba(0, 0, 0, 0.1)";
    }};
  }
`;

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, onClick, variant = "primary", ...rest }, ref) => {
  return (
    <StyledButton ref={ref} onClick={onClick} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
});
