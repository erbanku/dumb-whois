# dumb-whois — Agent Notes

## Stack

- **Backend**: Express (`server.js`), Node 18+
- **Frontend**: Vanilla ES modules in `public/` (`index.js`, `managers/toast.js`)
- **Deploy**: Vercel (`vercel.json`) and Docker

## Vercel deployment

Client JS in `public/` must be served as native ES modules. Do **not** route static assets through `@vercel/node` only — Vercel transpiles them to CommonJS, which breaks the browser (`require is not defined`).

`vercel.json` uses `@vercel/static` for `public/**` with explicit routes for `/assets/`, `/managers/`, `index.js`, and `service-worker.js`. API and SPA fallback stay on `server.js`.

## Local dev

```sh
npm install
npm run dev
```

## Key paths

|            Path            |                         Purpose                         |
| :------------------------: | :-----------------------------------------------------: |
|        `server.js`         |               Express API + SPA fallback                |
|     `public/index.js`      |                 Client app (ES module)                  |
| `public/service-worker.js` | PWA cache (bump `CACHE_NAME` when static assets change) |
|     `scripts/cors.js`      |                CORS / origin validation                 |

Last updated: 2026-06-29
