// The only account that can log in. Override on Vercel via env vars.
export const DEMO_ACCOUNT = {
  username: process.env.DEMO_USERNAME ?? "demo",
  password: process.env.DEMO_PASSWORD ?? "Demo@1234",
};
