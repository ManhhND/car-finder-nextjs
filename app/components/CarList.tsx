"use client";

import { Car } from "../utils/interfaces";
import CarItem from "./CarItem";
import LoadMoreBtn from "./LoadMoreBtn";

interface CarListProps {
  listTitle: string;
  data: Car[];
  hasPager: boolean;
  totalPages: number;
  currentPage: number;
  onLoadMore: () => void;
}

const CarList = ({
  listTitle,
  hasPager,
  data,
  totalPages,
  currentPage,
  onLoadMore,
}: CarListProps) => {
  return (
    <section>
      <h1 className="mb-5 text-gray-2 font-semibold">{listTitle}</h1>
      <div className="movie-list grid grid-flow-row justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
        {data.map((car) => {
          return (
            <CarItem key={`car-${car.nid}`} car={car} listTitle={listTitle} />
          );
        })}
      </div>
      {hasPager && currentPage < totalPages && (
        <LoadMoreBtn onBtnClick={onLoadMore} />
      )}
    </section>
  );
};

export default CarList;
