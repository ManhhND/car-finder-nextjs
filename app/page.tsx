import { getCarList } from "./api";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";

const Home = async () => {
  const carData = await getCarList({
    page: 0,
  });

  return (
    <div className="">
      <HeroBanner />
      <div className="flex flex-col gap-14 pb-20">
        <CarList
          title="All Cars"
          carItems={carData}
        />
      </div>
    </div>
  );
}

export default Home