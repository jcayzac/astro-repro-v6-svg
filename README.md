# Repro for weird bug in Astro v6 beta

This is a minimal reproduction of a weird bug I encountered in the Astro v6 beta.

In the latest v5, `astro build` generates the expected HTML files for all articles, but in v6 beta it does not. It just exits with no error and no generated files. Trying all the `NODE_OPTIONS` I could think of did not help.

Using `image()` in the content schema, and any SVG image in the entry, seems to trigger it. See the comment in `content/articles/article-2.yaml`.

## How to reproduce

The repro uses node 22.22.0 and pnpm 10.30.0, although I don't think it matters much. I had the exact same issue with node 25 and pnpm 10.29.

I trimmed everything down to the bare minimum, so the entries' content isn't even used and the articles are just a YAML collection (as to not depend on MDX or anything else).

```sh
# Make sure to clear everything before any new build
rm -rf node_modules/.astro .astro dist

# Build. The NODE_OPTIONS don't really matter, since there's nothing
# reported anyway.
NODE_OPTIONS="\
  --unhandled-rejections strict \
  --trace-warnings \
  --report-on-fatalerror \
  --report-uncaught-exception \
  --trace-uncaught \
" astro build
```

## The weird "fix"

See the comment in `content/articles/article-2.yaml`:

```yaml
# it works if commented out and the next one is used instead :(
hero: './boy-reading.svg'
# hero: './hero1.webp'
```

Changing from an SVG (relative or not) to a WEBP (relative or not) makes the build work as expected, i.e. generate the HTML files for the two articles.

```diff
--- 1/build.svg.log
+++ 2/build.webp.log
@@ -12,3 +12,10 @@
 [build] Rearranging server assets...

  generating static routes
+  ├─ /article-2/index.html (+##ms)
+  ├─ /article-1/index.html (+##ms)
+✓ Completed in ##ms.
+
+[build] ✓ Completed in ##ms.
+[build] 2 page(s) built in ##ms
+[build] Complete!
```

## Observations

1. The SVG image gets copied into `dist/_astro/`, like the WEBP.
2. Whenever the SVG image is used, the `getStaticPaths()` function (in `src/pages/[id]/index.astro`) is never invoked (if I log to the console first thing inside it, that log is never emitted).
3. In `src/pages/[id]/index.astro`, if I don't use a top-level await and instead move the call to `getCollection()` inside of `getStaticPaths()`, the build works as expected.

   > [!TIP]
   > This suggest an Astro v6 regression related to top-level awaits.
