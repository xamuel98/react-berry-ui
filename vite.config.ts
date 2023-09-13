import { resolve } from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json" assert { type: "json" };

export default defineConfig ({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-berry-ui",
   		 
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});