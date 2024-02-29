"use client";

import { useGlobalContext } from "@/context/globalContext";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getAllCars } from "./api";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";
import { Car } from "./utils/interfaces";

const Home = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const { allCars, setAllCars } = useGlobalContext();
  const accountActivated = searchParams && searchParams.activated === "1";

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
        {accountActivated && (
          <section className="message flex gap-4 p-4">
            <div className="message-header flex justify-center">
              <FaCheckCircle size={24} style={{ color: "green" }} />
            </div>
            <div className="message-content text-center">
              Your account has been activated! You are now able to log in using
              your credentials.
            </div>
          </section>
        )}
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
