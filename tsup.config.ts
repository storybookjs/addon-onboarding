import { defineConfig } from "tsup";
const packageJson = require("./package.json");

const baseConfig = {
  splitting: false,
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: false,
  // There is a bug with having multiple configs (browser+node)
  // where watch mode doesn't work properly, so we handle cleaning up with rimraf instead
  clean: false,
  external: Array.from(
    new Set([
      ...Object.keys(packageJson.peerDependencies),
      ...Object.keys(packageJson.dependencies),
      "@storybook/blocks",
      "@storybook/channels",
      "@storybook/components",
      "@storybook/core-events",
      "@storybook/manager-api",
      "@storybook/theming",
      "@storybook/types",
    ])
  ),
};

export default defineConfig((options) => [
  {
    ...baseConfig,
    entry: ["src/preset.ts"],
    format: ["cjs"],
    platform: "node",
    minify: !options.watch,
  },
  {
    ...baseConfig,
    entry: ["src/index.ts", "src/manager.tsx"],
    format: ["esm"],
    shims: false,
    platform: "browser",
    esbuildOptions(options) {
      options.conditions = ["module"];
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
      };
    },
    minify: !options.watch,
  },
]);
