"use client";

import { useGlobalContext } from "@/context/globalContext";
import { useEffect } from "react";
import { getAllCars } from "./api";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";
import { Car } from "./utils/interfaces";

const Home = () => {
  const { allCars, setAllCars } = useGlobalContext();

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
    <>
      <main className="w-full bg-gray">
        <HeroBanner />
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList
            listTitle="Popular Cars"
            hasPager={false}
            listType="popular"
          />
          <CarList listTitle="All Cars" hasPager={true} listType="all" />
        </div>
      </main>
    </>
  );
};

export default Home;
