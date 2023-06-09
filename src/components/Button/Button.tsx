import React from "react";
import { styled } from "@storybook/theming";

export interface ButtonProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Button = styled.button`
  all: unset;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  background: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.lightest};
  height: 32px;
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fonts.base};
  transition: all 0.16s ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: #0b94eb;
  }

  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;
