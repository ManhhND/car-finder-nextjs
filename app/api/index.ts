const API_BASE_URL = "https://dev-kopm.pantheonsite.io/api";

export const getCarList = async ({
  page,
}: {
  page: number;
}) => {
  const url = `${API_BASE_URL}/cars?_format=json&page=${page}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getAllCars = async () => {
  const url = `${API_BASE_URL}/cars/all?_format=json`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};