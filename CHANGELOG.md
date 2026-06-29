# Changelogs for dumb-whois

> Created and Maintained by @erbanku and fellow AI agents

## 06/29/2026

- Fixed Vercel serving transpiled CommonJS client JS (`require is not defined`) by routing `public/` assets through `@vercel/static` instead of `@vercel/node`
- Bumped service worker cache version to invalidate stale transpiled bundles
