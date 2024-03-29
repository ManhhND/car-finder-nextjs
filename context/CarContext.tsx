"use client";

import { getAllCars } from "@/app/api";
import { Car } from "@/app/utils/interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CarContextProps {
  allCars: Car[];
  setAllCars: Dispatch<SetStateAction<Car[]>>;
  updateFavorite: (carId: number) => void;
}

const defaultValues: CarContextProps = {
  allCars: [],
  setAllCars: () => {},
  updateFavorite: () => {},
};

export const CarContext = createContext<CarContextProps>(defaultValues);

export const CarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allCars, setAllCars] = useState<Car[]>([]);

  const updateFavorite = (carId: number) => {
    const updatedCars = allCars.map((car) =>
      car.nid === carId
        ? {
            ...car,
            field_favorite: !car.field_favorite,
          }
        : car,
    );
    setAllCars(updatedCars);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allCars = await getAllCars();
      setAllCars(
        allCars.map((car: Car) => ({
          ...car,
          field_favorite: false,
        })),
      );
    };
    if (!allCars.length) {
      fetchData();
    }
  }, []);

  return (
    <CarContext.Provider
      value={{
        allCars,
        setAllCars,
        updateFavorite,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);
