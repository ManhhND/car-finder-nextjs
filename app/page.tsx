import { FaCheckCircle } from "react-icons/fa";
import { getAllCars, getCarList, getPopularCars } from "./api";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";

const Home = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const accountActivated = searchParams && searchParams.activated === "1";

  const allCars = await getAllCars();
  const carList = await getCarList({
    page: 0,
  });
  const numberOfPages = Math.round((allCars.length - carList.length) / 4);
  const popularCars = await getPopularCars();

  return (
    <>
      <main className="w-full bg-gray">
        {accountActivated && (
          <section className="message flex gap-4 p-4">
            <div className="message-header flex justify-center">
              <FaCheckCircle size={24} style={{ color: "green" }} />
            </div>
            <div className="message-content text-center">
              Your account has been activated! You are now able to log in using
              your credentials.
            </div>
          </section>
        )}
        <HeroBanner />
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList listTitle="Popular Cars" carItems={popularCars} />
          <CarList
            listTitle="All Cars"
            carItems={carList}
            numberOfPages={numberOfPages}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
