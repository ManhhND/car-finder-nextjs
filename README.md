# Live Preview

https://kopm-car-finder.vercel.app/

# Local setup

Clone this repo:

```
git clone https://github.com/ffw-manh-nguyen/car-finder-nextjs.git
```

Go to project:

```
cd car-finder-nextjs
```

Install packages (Node version used: `v20.3.1`):

```
npm install
```

Optionally copy `.env.example` to `.env.local` and fill it in (see [Environment variables](#environment-variables)). Without it, the app runs locally with a development-only secret.

Start project:

```
npm run dev
```

# About this project

- A web app for car rental, built with Next.js, Typescript and Tailwind CSS
- It has 4 routes:

  - Homepage `/`: displays popular cars list and all cars list with a load more button
  - Car detail page `/car/{id}`: displays car information and a link to the official website of that car brand
  - User login page `/login`: displays login form
  - User register page `/register`: displays register form
  - Favorite cars page `/favorite-cars`: displays user's favorite cars as list

- It has a search box at page header so user can filter cars by name
- Authentication flow: home page, car detail page and favorite cars page are restricted. Anonymous users are redirected to the login page. Log in with the demo account shown on the login page, or register a new account, which signs you in straight away.
- Car data is bundled with the app (`data/cars.json`, images in `public/cars/`). Login, registration and logout are handled by Next.js Route Handlers in `app/api/auth/`. Sessions are signed JWTs stored in an httpOnly cookie, so the app needs no database and runs entirely on Vercel.
- **Note**: There is no user store. Only the demo account can log in; a registered account works until you log out or the session expires (7 days). Favorite cars are kept in memory and are lost after a page refresh.
- The original backend was a Drupal site on Pantheon, which is no longer available.
- Icons brought to you by React icons library
- Using Yup, react-hook-form libraries to handle form validation
- Using jose to sign and verify session cookies

# Environment variables

| Name            | Required      | Description                                                                   |
| --------------- | ------------- | ----------------------------------------------------------------------------- |
| `AUTH_SECRET`   | In production | Secret used to sign session cookies. Generate with `openssl rand -base64 32`. |
| `DEMO_USERNAME` | No            | Demo account username. Defaults to `demo`.                                    |
| `DEMO_PASSWORD` | No            | Demo account password. Defaults to `Demo@1234`.                               |

# Deploy to Vercel

1. Import the repository in Vercel (framework preset: Next.js).
2. Add `AUTH_SECRET` in Project Settings → Environment Variables for Production and Preview.
3. Deploy. No other services are needed.

# References

- Next.js (https://nextjs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Tailwind CSS (https://tailwindcss.com/)
- jose (https://github.com/panva/jose)
- React Icons (https://react-icons.github.io/react-icons/)
