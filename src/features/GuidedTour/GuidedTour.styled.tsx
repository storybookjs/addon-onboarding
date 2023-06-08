import { type Theme } from "@storybook/theming";

export const getStyles = (theme: Theme) => ({
  border: 0,
  borderRadius: "0.25rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.75rem",
  background: theme.color.secondary,
  color: "#FFF",
  height: 32,
  fontSize: "0.8125rem",
  fontWeight: 700,
  fontFamily: theme.typography.fonts.base,
  transition: "all 0.16s ease-in-out",
  textDecoration: "none",
  outline: "none",
});
