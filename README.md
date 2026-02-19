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
