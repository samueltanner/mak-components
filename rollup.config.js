import typescript from "@rollup/plugin-typescript"
import babel from "@rollup/plugin-babel"

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
  ],
  external: [
    "react",
    "react-dom",
    "tailwindcss",
    "@mak-stack/mak-ui",
    "react-icons/bi",
    "framer-motion",
  ],
}
