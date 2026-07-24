import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    // tanstackStart() must come before viteReact() in the plugins array.
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    // Builds the SSR bundle; pick a preset for your target host, e.g.
    // nitro({ preset: "cloudflare" }) or nitro({ preset: "node-server" }).
    // See https://nitro.build/deploy for the full preset list.
    nitro(),
  ],
  environments: {
    ssr: {
      build: {
        // src/server.ts is our SSR wrapper (adds error handling around
        // TanStack Start's generated server entry) — build from it directly.
        rollupOptions: { input: "./src/server.ts" },
      },
    },
  },
});
