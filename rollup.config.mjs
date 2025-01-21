import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "scripts/main.js",
  output: {
    file: "scripts/dist/bundle.js",
    format: "iife",
    name: "bundle",
  },
  plugins: [resolve(), commonjs(), terser()],
};
