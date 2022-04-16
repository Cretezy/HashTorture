import {
  defineConfig,
  IndexHtmlTransformContext,
  IndexHtmlTransformResult,
  Plugin,
} from "vite";
import react from "@vitejs/plugin-react";

// Don't bundle inline styles in index.html
// https://github.com/richardtallent/vite-plugin-singlefile/blob/33cfbedb1e6abf580dd4577cc8a5a1ddfa9a33e5/src/index.ts
const inlineCss: Plugin = {
  name: "vite:inlineCss",
  transformIndexHtml: {
    enforce: "post",
    transform(
      html: string,
      ctx?: IndexHtmlTransformContext
    ): IndexHtmlTransformResult {
      if (!ctx || !ctx.bundle) return html;

      for (const value of Object.values(ctx.bundle)) {
        if (value.type === "asset" && value.fileName.endsWith(".css")) {
          const reCss = new RegExp(
            `<link rel="stylesheet"[^>]*?href="[./]*${value.fileName}"[^>]*?>`
          );
          const code = `<style type="text/css">\n${value.source}\n</style>`;
          html = html.replace(reCss, () => code);
        }
      }

      return html;
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss],
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from "@emotion/react"`,
  },
});
