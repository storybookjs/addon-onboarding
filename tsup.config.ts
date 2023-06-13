import { defineConfig } from "tsup";

const baseConfig = {
  splitting: false,
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: false,
  clean: true,
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
