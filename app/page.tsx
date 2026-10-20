import CarList from "./components/CarList";
import HeroBanner from "./components/HeroBanner";

const Home = () => {
  return (
    <>
      <main className="w-full bg-gray">
        <HeroBanner />
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList
            listTitle="Popular Cars"
            hasPager={false}
            listType="popular"
          />
          <CarList listTitle="All Cars" hasPager={true} listType="all" />
        </div>
      </main>
    </>
  );
};

export default Home;
