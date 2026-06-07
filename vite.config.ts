// @lovable.dev/vite-tanstack-config already includes plugins.
// We only force Nitro so Vercel gets server output.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,

  tanstackStart: {
    server: { entry: "server" },
  },
});