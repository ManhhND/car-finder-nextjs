"use client";

import { Car } from "@/app/utils/interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const defaultValues: {
  allCars: Car[];
  setAllCars: Dispatch<SetStateAction<Car[]>>;
  list: Car[];
  setList: Dispatch<SetStateAction<Car[]>>;
  pagerList: Car[];
  setPagerList: Dispatch<SetStateAction<Car[]>>;
  updateFavorite: (carId: number) => void;
} = {
  allCars: [],
  setAllCars: () => {},
  list: [],
  setList: () => {},
  pagerList: [],
  setPagerList: () => {},
  updateFavorite: (carId: number) => {},
};

const GlobalContext = createContext(defaultValues);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [list, setList] = useState<Car[]>([]);
  const [pagerList, setPagerList] = useState<Car[]>([]);
  const favorite = false;

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

  return (
    <GlobalContext.Provider
      value={{
        allCars,
        setAllCars,
        list,
        setList,
        pagerList,
        setPagerList,
        updateFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
