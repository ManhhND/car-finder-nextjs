import { Car } from "@/app/utils/interfaces";
import { useGlobalContext } from "@/context/globalContext";
import gasSVG from "@/public/gas-station.svg";
import heartSVG from "@/public/heart.svg";
import outlinedHeartSVG from "@/public/outlined-heart.svg";
import peopleSVG from "@/public/profile-2user.svg";
import steeringSVG from "@/public/steering.svg";
import Image from "next/image";
import Link from "next/link";

const CarItem = ({
  nid,
  title,
  field_description,
  field_car_type,
  field_capacity,
  field_steering,
  field_gasoline,
  field_image,
  field_price,
  field_brand,
  field_favorite,
  listTitle,
}: Car & { listTitle: string }) => {
  const { updateFavorite } = useGlobalContext();
  field_image = field_image.trim().replace("/\n/g", "");

  return (
    <>
      <li className="list-none bg-white p-6 w-full">
        <div className="headline-section flex items-center">
          <h2 className="w-11/12 text-xl">{title}</h2>
          <div className="favorite w-1/12">
            <input
              type="checkbox"
              id={`${listTitle} ${title}`}
              onChange={() => updateFavorite(nid)}
              className="hidden"
            />
            <label htmlFor={`${listTitle} ${title}`} className="cursor-pointer">
              <Image
                src={field_favorite ? heartSVG : outlinedHeartSVG}
                alt="favorite"
              />
            </label>
          </div>
        </div>
        <div className="text-gray-5">{field_car_type}</div>
        <div className="info-section flex md:flex-col mobile:justify-evenly mobile:items-center md:gap-6 mb-6">
          <div className="car-image flex items-center justify-center md:min-h-52 mobile:w-1/2">
            <Image
              src={field_image}
              width={250}
              height={125}
              alt={`${title}-image`}
            />
          </div>
          <div className="car-details flex flex-col md:flex-row sm:justify-between mobile:gap-4 text-gray-5 text-sm">
            <div className="flex gap-1.5 items-center">
              <Image src={gasSVG} alt="gas" />
              {field_gasoline}
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src={steeringSVG} alt="steering" />
              {field_steering}
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src={peopleSVG} alt="capacity" />
              {field_capacity} People
            </div>
          </div>
        </div>
        <div className="action-section flex justify-between items-center">
          <div className="font-bold text-xl">
            {field_price}/{" "}
            <span className="text-gray-5 font-normal text-base">day</span>
          </div>
          <Link
            href={`/car/${nid}`}
            className="text-white bg-blue py-3 px-6 rounded"
          >
            Rent Now
          </Link>
        </div>
      </li>
    </>
  );
};

export default CarItem;
