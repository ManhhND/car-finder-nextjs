"use client";

import { useCarContext } from "@/context/CarContext";
import { useState } from "react";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";

const itemsOnFirstPage = 8;
const itemsPerPage = 4;

const Home = () => {
  const { allCars } = useCarContext();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const popularCars = allCars.filter(
    (car) => car.field_popular.toLowerCase() === "true",
  );
  const totalPages = Math.round(
    (allCars.length - itemsOnFirstPage) / itemsPerPage,
  );
  const pagerList = allCars.slice(
    0,
    itemsOnFirstPage + itemsPerPage * currentPage,
  );

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <main className="w-full bg-gray">
        <HeroBanner />
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList
            listTitle="Popular Cars"
            data={popularCars}
            hasPager={false}
            totalPages={1}
            currentPage={currentPage}
            onLoadMore={handleLoadMore}
          />
          <CarList
            listTitle="All Cars"
            data={pagerList}
            hasPager={true}
            totalPages={totalPages}
            currentPage={currentPage}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
