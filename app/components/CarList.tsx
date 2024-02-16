'use client';

import { Car } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { getCarList } from "../api";
import CarItem from "./CarItem";

const CarList = ({
  title,
  carItems
}: {
  title: string,
  carItems: Car[]
}) => {
  const [cars, setCars] = useState<Car[]>(carItems)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLoadMore = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setCurrentPage(currentPage + 1)
    setIsLoading(false)
  }
  
  useEffect(() => {
    const startFetching = async () => {
      const newCars = await getCarList({
        page: currentPage,
      })
      setCars([...cars, ...newCars])
    }
    if (currentPage > 0) {
      startFetching()
    }
  }, [currentPage])


  return (
    <section className="px-5 pt-24">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="movie-list grid grid-flow-row justify-items-center gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {cars.map((car) => {
          return <CarItem key={`car-${car.nid}`} {...car} />;
        })}
      </div>
      <button
        onClick={handleLoadMore}
        type="button"
        className="bg-gray-400 font-bold text-white px-6 py-2 m-auto block"
      >
      {isLoading ? 'Loading...' : 'Show more car'}
      </button>
    </section>
  )
}

export default CarList