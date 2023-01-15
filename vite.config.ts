/// <reference types="vavite/vite-config" />

import { defineConfig } from "vite";
import vavite from "vavite";

export default defineConfig({
  plugins: [
    vavite({
      serverEntry: "src/server.ts",
      standalone: true,
    }),
  ],
});
