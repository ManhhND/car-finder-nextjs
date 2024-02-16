import { Car } from "@/utils/interfaces"
import Image from "next/image"
import Link from "next/link"

const CarItem = ({
  nid,
  title,
  field_description,
  field_car_type,
  field_capacity,
  field_steering,
  field_gasoline,
  field_image,
  field_price
}: Car) => {
  field_image = field_image.trim().replace('/\n/g', '')

  return (
    <>
      <li className="list-none">
        <Link href={`/car/${nid}`}>
          <h2>{title}</h2>
          <Image src={field_image} width={200} height={100} alt={`${title}-image`} />
          <div>{field_car_type}</div>
          <div>{field_gasoline}</div>
          <div>{field_steering}</div>
          <div>{field_capacity}</div>
          <div>{field_price}</div>
        </Link>
      </li>
    </>
  )
}

export default CarItem