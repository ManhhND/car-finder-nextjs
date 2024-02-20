import { getAllCars, getCarList, getPopularCars } from "./api";
import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";

const Home = async () => {
  const allCars = await getAllCars()
  const carList = await getCarList({
    page: 0,
  });
  const numberOfPages = Math.round((allCars.length - carList.length)/4)
  const popularCars = await getPopularCars();

  return (
    <div>
      <HeroBanner />
      <div className="flex flex-col mobile:p-4 p-16">
        <CarList
          listTitle="Popular Cars"
          carItems={popularCars}
        />
        <CarList
          listTitle="All Cars"
          carItems={carList}
          numberOfPages={numberOfPages}
        />
      </div>
    </div>
  );
}

export default Home