# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install`: install dependencies (README targets Node v20.3.1). The lockfile can drift from `package.json`, which makes `npm ci` fail. Use `npm install`.
- `npm run dev`: start the dev server at http://localhost:3000
- `npm run build` / `npm start`: production build and serve
- `npm run lint`: ESLint (`next/core-web-vitals` + `prettier`)
- Formatting uses Prettier with `prettier-plugin-tailwindcss` (double quotes, semicolons, trailing commas, width 80). There is no npm script for it, so run `npx prettier --write <files>`.

The project has no test suite.

## Architecture

Next.js 14 App Router app for a car rental site, written in TypeScript and Tailwind. It needs no external services and deploys as-is to Vercel. The original Drupal/Pantheon backend is gone; car fields still use Drupal's naming (`nid`, `field_brand`, `field_popular` as the string `"true"`, …), see `app/utils/interfaces.ts`.

Env vars (see `.env.example`): `AUTH_SECRET` is required in production, because `lib/session.ts` throws without it. In dev it falls back to an insecure secret. `DEMO_USERNAME`/`DEMO_PASSWORD` override the demo login (`demo` / `Demo@1234`).

**Data:** cars live in `data/cars.json`, images in `public/cars/*.svg`. `lib/cars.ts` (`getAllCars`, `getCarDetail`) is the only reader; its functions are async so a remote source can replace the JSON without touching callers. The root layout loads the cars once and passes them to both `Header` (for `SearchBar`) and `GlobalContextProvider` (`initialCars`). Pages do not fetch cars themselves.

**Auth** is stateless, with a signed HS256 JWT (via `jose`) in an httpOnly `session` cookie:

- `lib/session.ts` creates/verifies tokens. `getSession()` accepts either `cookies()` or `NextRequest.cookies`.
- Route handlers in `app/api/auth/{login,register,logout}/route.ts`. They return `{ message }` on error, which the forms display. Client code calls them through `lib/auth.ts`.
- Only the demo account (`lib/demoAccount.ts`) can log in. Register validates and signs the user in, but nothing is stored, so that account cannot log in again after logout. This is a documented limitation.
- `middleware.ts` verifies the session (Edge runtime). Without it, `/`, `/car/{id}` and `/favorite-cars` redirect to `/login`. With it, `/login` and `/register` redirect to `/`. Its `matcher` skips `api`, static assets and `public/cars`.
- `Header` (server component) verifies the session to choose the menu in `AuthSection`. Logout calls the logout route, since an httpOnly cookie cannot be cleared client-side.

**State:** `context/globalContext.tsx` holds `allCars` plus derived `list` / `pagerList` arrays that `CarList` uses for the popular, favorite and paged "all" views. `listType` selects the filter and `hasPager` toggles load-more. Favorites only live in memory (`updateFavorite` toggles `field_favorite`), so they are lost on refresh.

`app/car/[id]/page.tsx` calls `notFound()` for unknown ids and maps `field_brand` to a logo and an official site via `brands` in `app/utils/mappings.ts`. Supporting a new brand means adding an entry there and an SVG in `public/`.

**Forms** use `react-hook-form` with `yupResolver`. The Yup schemas in `app/utils/validation.ts` are shared with the auth route handlers.

**Styling:** Tailwind with a custom palette (`gray`, `gray-2`…`gray-5`, `blue`, `black`) and custom breakpoints in `tailwind.config.ts`. `tablet`, `mobile` and `mobile-sm` are **max-width** breakpoints, which work the opposite way from Tailwind's default min-width `sm`/`md`.

Imports use the `@/*` alias for the repo root.
