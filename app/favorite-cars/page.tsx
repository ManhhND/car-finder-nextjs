import CarList from "../components/CarList";

const FavoriteCars = () => {
  return (
    <>
      <main className="w-full bg-gray">
        <div className="flex flex-col mobile:p-4 p-16">
          <CarList
            listTitle="Favorites Cars"
            hasPager={false}
            listType="favorite"
          />
        </div>
      </main>
    </>
  );
};

export default FavoriteCars;
