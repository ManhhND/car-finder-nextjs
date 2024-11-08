import { getCarDetail } from "@/app/api";
import { Car } from "@/app/utils/interfaces";
import { brands } from "@/app/utils/mappings";
import Image from "next/image";
import Link from "next/link";

const CarDetail = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const carData = await getCarDetail({ id });
  let {
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
  }: Car = carData[0];
  field_image = field_image.trim().replace("/\n/g", "");
  const brand = brands.filter((brand) => brand.name === field_brand)[0];

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="hero-banner relative w-full text-white text-center bg-gray-4 aspect-5/2 md:px-8 px-4 pt-6 pb-4">
          <div className="flex flex-col mobile:flex-col-reverse mobile:items-start">
            <div className="text-right text-3xl font-bold">
              {field_price} / <span className="text-lg">day</span>
            </div>
            <h1 className="mb-2 text-5xl mobile:text-4xl font-black drop-shadow-lg md:mb-0">
              {title}
            </h1>
          </div>
          <div className="car-image relative mx-auto md:w-2/3 aspect-2/1">
            <Image src={field_image} alt={title} fill />
          </div>
        </div>
        <div className="info text-black bg-white mb-8 py-6 px-4">
          <div className="description border-b border-gray-3 pb-6">
            <h3 className="text-lg font-bold pb-2">Description</h3>
            <p className="text-gray-2">{field_description}</p>
          </div>
          <div className="flex mobile:flex-col gap-y-8 pt-6">
            <div className="technical-details flex-auto">
              <h3 className="text-lg font-bold pb-2">Technical Details</h3>
              <table className="table-fixed">
                <tbody>
                  <tr className="border border-gray-3">
                    <td className="p-3 text-gray-5">Car Type</td>
                    <td className="p-3 border-r border-gray-3 text-gray-4">
                      {field_car_type}
                    </td>
                    <td className="p-3 text-gray-5">Capacity</td>
                    <td className="p-3 text-gray-4">{field_capacity} Person</td>
                  </tr>
                  <tr className="border border-gray-3">
                    <td className="p-3 text-gray-5">Steering</td>
                    <td className="p-3 border-r border-gray-3 text-gray-4">
                      {field_steering}
                    </td>
                    <td className="p-3 text-gray-5">Gasoline</td>
                    <td className="p-3 text-gray-4">{field_gasoline}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="more-info text-lg font-bold flex-auto">
              <h3 className="pb-2">More info about {title}</h3>
              <div className="brand-logo relative h-6 aspect-2/1">
                <Link href={brand?.website}>
                  <Image src={brand?.logo} alt={`${field_brand}-logo`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
