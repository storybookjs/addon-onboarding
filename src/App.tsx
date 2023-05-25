import { ThemeProvider, ensure, themes } from "@storybook/theming";
import React from "react";

const theme = ensure(themes.light);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>Hello World</div>
    </ThemeProvider>
  );
}
