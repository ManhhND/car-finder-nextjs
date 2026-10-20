import { Car } from "@/app/utils/interfaces";
import carsData from "@/data/cars.json";

// Cars are bundled with the app. Functions stay async so the data source can
// be swapped for a remote API without touching callers.
const cars: Car[] = carsData.map((car) => ({ ...car, field_favorite: false }));

export const getAllCars = async (): Promise<Car[]> => cars;

export const getCarDetail = async (id: string): Promise<Car | null> =>
  cars.find((car) => String(car.nid) === id) ?? null;
