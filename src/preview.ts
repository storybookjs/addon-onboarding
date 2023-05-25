import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { ThemeProvider, ensure, themes } from "@storybook/theming";
import React from "react";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {};

export default preview;
