import type { Preview } from "@storybook/react";
import { ThemeProvider, ensure, themes } from "@storybook/theming";
import React from "react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (storyFn) => {
      const theme = ensure(themes.light);

      return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
    },
  ],
};

export default preview;
