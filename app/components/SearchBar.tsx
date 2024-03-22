"use client";

import { Car } from "@/app/utils/interfaces";
import SearchSVG from "@/public/search.svg";
import { ChangeEvent, useEffect, useState } from "react";
import CarSearchItem from "./CarSearchItem";

const SearchBar = ({ data }: { data: Car[] }) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const allCars = data;

  const filteredCars = allCars.filter((car) =>
    car.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  useEffect(() => {
    // Attach event handlers here
    const handleClick = () => {
      stopSearching();
    };

    // Attach event listener
    window.addEventListener("click", handleClick);
    handleClick();

    // Cleanup
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setSearching(true);
    }
    setSearchKeyword(e.target.value);
  };

  const stopSearching = () => {
    setSearching(false);
  };

  return (
    <>
      <div className="search-box flex gap-2 rounded-lg border border-gray-3 text-gray-3 mobile:w-full md:w-1/2 px-2 items-center">
        <SearchSVG alt="search" />
        <input
          type="text"
          placeholder="Search for your car..."
          className="w-5/6 p-2 focus:outline-0"
          onChange={handleInput}
        />
      </div>
      {searching && searchKeyword && filteredCars.length !== 0 && (
        <div className="absolute z-10">
          <div className="flex flex-col gap-4 bg-gray p-2 shadow-lg shadow-black">
            {filteredCars.map((car) => (
              <CarSearchItem
                key={`car-${car.nid}`}
                car={car}
                onStopSearching={stopSearching}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
