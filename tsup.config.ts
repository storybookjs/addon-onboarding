import { defineConfig } from "tsup";

const packageJson = require("./package.json");

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/preview.ts", "src/manager.tsx"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  external: Array.from(
    new Set([
      ...Object.keys(packageJson.peerDependencies),
      ...Object.keys(packageJson.dependencies),
      "@storybook/blocks",
      "@storybook/components",
      "@storybook/core-events",
      "@storybook/manager-api",
      "@storybook/theming",
      "@storybook/types",
    ])
  ),
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: "browser",
  esbuildOptions(options) {
    options.conditions = ["module"];
    options.loader = {
      ...options.loader,
      ".png": "dataurl",
    };
  },
}));
