# Frontend Bundler with CSS Purging

This project demonstrates using Bun as a frontend bundler with automatic CSS purging to remove unused styles.

## Features

- **Bun Bundler**: Fast JavaScript/TypeScript bundling
- **CSS Purging**: Automatic removal of unused CSS using PurgeCSS
- **PicoCSS**: Lightweight CSS framework
- **TypeScript Support**: Full TypeScript compilation

## Build Process

The build process automatically:

1. **Prebuild**: Cleans the `dist` directory
2. **Build**: Bundles your code using Bun
3. **Postbuild**: Removes unused CSS using PurgeCSS

### CSS Purging Results

- **Original CSS size**: ~131 KB (includes full PicoCSS framework)
- **After purging**: ~29 KB (removes ~77% of unused CSS)
- **Size reduction**: ~99 KB saved

## Available Scripts

```bash
# Development server
bun run dev

# Build with CSS purging
bun run build

# Run tests
bun run test

# Type checking
bun run type-check
```

## How CSS Purging Works

PurgeCSS scans your source files (HTML, TypeScript, etc.) and identifies which CSS classes are actually used. It then removes all unused CSS rules, significantly reducing your bundle size.

### Safelist

The configuration includes a safelist of important CSS classes that should always be preserved:
- HTML element selectors
- PicoCSS framework classes
- Your custom classes (`container`, `form`, `result`)

## Customization

To modify the CSS purging behavior, edit `scripts/purge-css.mjs`:
- Add/remove safelist items
- Change content scanning patterns
- Modify output options

## Dependencies

- `purgecss`: CSS purging tool
- `@picocss/pico`: CSS framework
- `lodash`: Utility library
