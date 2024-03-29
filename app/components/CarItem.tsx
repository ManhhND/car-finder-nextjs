import { Car } from "@/app/utils/interfaces";
import GasSVG from "@/public/gas-station.svg";
import PeopleSVG from "@/public/profile-2user.svg";
import SteeringSVG from "@/public/steering.svg";
import Image from "next/image";
import Link from "next/link";
import FavoriteBtn from "./FavoriteBtn";

export interface CarItemProps {
  car: Car;
  listTitle: string;
}

const CarItem = ({ car, listTitle }: CarItemProps) => {
  const field_image = car.field_image.trim().replace("/\n/g", "");

  return (
    <div className="list-none bg-white p-6 w-full">
      <div className="headline-section flex items-center">
        <h2 className="w-11/12 text-xl">{car.title}</h2>
        <div className="favorite w-1/12">
          <FavoriteBtn carId={car.nid} listTitle={listTitle} />
        </div>
      </div>
      <div className="text-gray-5">{car.field_car_type}</div>
      <div className="info-section flex md:flex-col mobile:justify-evenly mobile:items-center md:gap-6 mb-6">
        <div className="car-image flex items-center justify-center md:min-h-52 mobile:w-1/2">
          <Image
            src={field_image}
            width={250}
            height={125}
            alt={`${car.title}-image`}
          />
        </div>
        <div className="car-details flex flex-col md:flex-row sm:justify-between mobile:gap-4 text-gray-5 text-sm">
          <div className="flex gap-1.5 items-center">
            <GasSVG alt="gas" />
            {car.field_gasoline}
          </div>
          <div className="flex gap-1.5 items-center">
            <SteeringSVG alt="steering" />
            {car.field_steering}
          </div>
          <div className="flex gap-1.5 items-center">
            <PeopleSVG alt="capacity" />
            {car.field_capacity} People
          </div>
        </div>
      </div>
      <div className="action-section flex justify-between items-center">
        <div className="font-bold text-xl">
          {car.field_price}/{" "}
          <span className="text-gray-5 font-normal text-base">day</span>
        </div>
        <Link
          href={`/car/${car.nid}`}
          className="text-white bg-blue py-3 px-6 rounded"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
};

export default CarItem;
