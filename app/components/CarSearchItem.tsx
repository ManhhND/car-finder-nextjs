import { Car } from "@/app/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

interface CarSearchItemProps {
  car: Car;
  onStopSearching: () => void;
}

const CarSearchItem = ({ car, onStopSearching }: CarSearchItemProps) => {
  const field_image = car.field_image.trim().replace("/\n/g", "");

  return (
    <>
      <li className="list-none bg-white p-4" data-testid="search-item">
        <Link
          href={`/car/${car.nid}`}
          className="flex items-center gap-8"
          onClick={onStopSearching}
        >
          <div className="car-image">
            <Image
              src={field_image}
              width={250}
              height={125}
              alt={`${car.title}-image`}
            />
          </div>
          <h2 className="w-11/12 text-xl">{car.title}</h2>
        </Link>
      </li>
    </>
  );
};

export default CarSearchItem;
