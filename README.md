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
- Authentication flow: home page and car detail page are restricted, anonymous users go to these pages will be redirected to login page for authentication. If they didn't have an account yet, they can register a new one at register page. After finishing the registration, an email will be sent to user for email address verification. When user click on the link in the email, their account will be activated and ready to use, user will also be redirect back to CarFinder website.
- Backend APIs for cars fetching, user login and user registration is being served by a Drupal site I created and hosted on [Pantheon](https://dashboard.pantheon.io/)
- **Note**: Favorite cars doesn't include backed function. Favorite data will be lost after page refreshing
- Icons brought to you by React icons library
- Using Yup, react-hook-form libraries to handle form validation
- Using universal-cookie library to handle cookie on client components

# References

- Next.js (https://nextjs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Tailwind CSS (https://tailwindcss.com/)
- Pantheon (https://pantheon.io/)
- Drupal (https://drupal.org/)
- React Icons (https://react-icons.github.io/react-icons/)
