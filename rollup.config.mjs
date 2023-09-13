import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };

export default [
  	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			nodeResolve(), // Resolve external dependencies from node_modules
			commonjs(), // Convert CommonJS modules to ES modules
			babel({ babelHelpers: 'bundled' }), // Transpile with Babel
			typescript({ tsconfig: "./tsconfig.json" }),
			terser(), // Minify the output (optional, remove if not needed)
			postcss(), 
		],
		external: ["react", "react-dom", "styled-components"],
	},
	{
		input: "src/index.ts",
		output: [{ file: "dist/types.d.ts", format: "esm" }],
		plugins: [dts()],
	},
];