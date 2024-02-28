"use client";

import { Car } from "@/app/utils/interfaces";
import searchSVG from "@/public/search.svg";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import CarSearchItem from "./CarSearchItem";

const SearchBar = ({ data }: { data: Car[] }) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const allCars = data;

  useEffect(() => {
    setFilteredCars(
      allCars.filter((car) =>
        car.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      ),
    );
  }, [searchKeyword]);

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
      setLoading(true);
      setSearching(true);
      await new Promise((r) => setTimeout(r, 1000));
    }
    setSearchKeyword(e.target.value);
    setLoading(false);
  };

  const stopSearching = () => {
    setSearching(false);
  };

  return (
    <>
      <div className="search-box flex gap-2 rounded-lg border border-gray-3 text-gray-3 mobile:w-full md:w-1/2 px-2 items-center">
        <Image src={searchSVG} alt="search" />
        <input
          type="text"
          placeholder="Search for your car..."
          className="w-full p-2 focus:outline-0"
          onChange={handleInput}
        />
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-8 text-gray-200 animate-spin text-gray-3 fill-gray-2 w-full"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
      {searching && !loading && searchKeyword && filteredCars.length !== 0 && (
        <div className="absolute z-10">
          <div className="flex flex-col gap-4 bg-gray p-2 shadow-lg shadow-black">
            {filteredCars.map((car) => (
              <CarSearchItem
                key={`car-${car.nid}`}
                {...car}
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
