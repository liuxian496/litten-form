import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        copyPublicDir: false,
        cssCodeSplit: true,
        lib: {
            entry: {
                index: "src/index.ts",
            },
            name: "littenForm",
            fileName: "index",
        },
        outDir: "dist",
        rollupOptions: {
            external: [
                "cyndi/dist/getPrefixNs",
                "classnames",
                "exception-boundary",
                "litten-hooks/dist/enum",
                "litten-hooks/dist/contentControl",
                "lodash/isFunction",
                "react",
                "react-dom",
                "react/jsx-runtime",
            ],
            output: [
                {
                    manualChunks: (id: string) => {
                        if (id.includes("node_modules")) {
                            console.log(id);
                            return "vender";
                        }
                    },
                    format: "es",
                    chunkFileNames: "chunks/[name].[hash].js",
                    assetFileNames: "assets/[name][extname]",
                    entryFileNames: "[name].js",
                },
            ],
        },
    },
    plugins: [react(), dts(), visualizer()],
});
