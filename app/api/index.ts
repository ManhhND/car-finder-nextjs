import { LogInData } from "../login/page";
import { RegisterData } from "../register/page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllCars = async () => {
  const endpoint = `${apiBaseUrl}/cars/all?_format=json`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};

export const getCarDetail = async ({ id }: { id: string }) => {
  const endpoint = `${apiBaseUrl}/car/${id}?_format=json`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};

export const userLogIn = async ({ username, password }: LogInData) => {
  const endpoint = `${baseUrl}/user/login?_format=json`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ name: username, pass: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const userRegister = async ({
  email,
  username,
  password,
}: RegisterData) => {
  const endpoint = `${baseUrl}/user/registerpass?_format=json`;
  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      name: { value: username },
      mail: { value: email },
      pass: { value: password },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
