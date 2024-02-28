const BASE_URL = "https://dev-kopm.pantheonsite.io";
const API_BASE_URL = "https://dev-kopm.pantheonsite.io/api";

export const getCarList = async ({ page }: { page: number }) => {
  const endpoint = `${API_BASE_URL}/cars?_format=json&page=${page}`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getAllCars = async () => {
  const endpoint = `${API_BASE_URL}/cars/all?_format=json`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getPopularCars = async () => {
  const endpoint = `${API_BASE_URL}/cars/popular?_format=json`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getCarDetail = async ({ id }: { id: string }) => {
  const endpoint = `${API_BASE_URL}/car/${id}?_format=json`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const userLogIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const endpoint = `${BASE_URL}/user/login?_format=json`;

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
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const endpoint = `${BASE_URL}/user/registerpass?_format=json`;
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
