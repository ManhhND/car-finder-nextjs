"use client";

import { useCarContext } from "@/context/CarContext";
import CarList from "../components/CarList";

const FavoriteCars = () => {
  const { allCars } = useCarContext();
  const favoriteCars = allCars.filter((car) => car.field_favorite === true);

  return (
    <>
      <main className="w-full bg-gray">
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList
            listTitle="Favorites Cars"
            hasPager={false}
            data={favoriteCars}
            totalPages={1}
            currentPage={0}
            onLoadMore={() => null}
          />
        </div>
      </main>
    </>
  );
};

export default FavoriteCars;
