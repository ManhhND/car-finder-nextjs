import { Car } from "@/app/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

const CarSearchItem = ({
  nid,
  title,
  field_description,
  field_car_type,
  field_capacity,
  field_steering,
  field_gasoline,
  field_image,
  field_price,
  onStopSearching,
}: Car & {
  onStopSearching: () => void;
}) => {
  field_image = field_image.trim().replace("/\n/g", "");

  return (
    <>
      <li className="list-none bg-white p-4">
        <Link
          href={`/car/${nid}`}
          className="flex items-center gap-8"
          onClick={onStopSearching}
        >
          <div className="car-image">
            <Image
              src={field_image}
              width={250}
              height={125}
              alt={`${title}-image`}
            />
          </div>
          <h2 className="w-11/12 text-xl">{title}</h2>
        </Link>
      </li>
    </>
  );
};

export default CarSearchItem;
