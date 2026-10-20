// Client-side calls to the auth route handlers in app/api/auth.
// Errors resolve to `{ message }`, matching what the forms already display.
const post = async (path: string, body?: object) => {
  const res = await fetch(path, {
    method: "POST",
    body: body && JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const userLogIn = (credentials: {
  username: string;
  password: string;
}) => post("/api/auth/login", credentials);

export const userRegister = (account: {
  email: string;
  username: string;
  password: string;
}) => post("/api/auth/register", account);

export const userLogOut = () => post("/api/auth/logout");
