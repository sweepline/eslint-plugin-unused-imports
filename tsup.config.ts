import { defineConfig } from "tsup";

export default defineConfig({
    entryPoints: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    splitting: true,
    shims: true,
    cjsInterop: true,
    external: ["eslint", "@typescript-eslint/eslint-plugin"],
});
