import { useCarContext } from "@/context/CarContext";
import HeartSVG from "@/public/heart.svg";
import OutlinedHeartSVG from "@/public/outlined-heart.svg";

interface FavoriteBtnProps {
  listTitle: string;
  carId: number;
}
const FavoriteBtn = ({ listTitle, carId }: FavoriteBtnProps) => {
  const { allCars, updateFavorite } = useCarContext();
  const car = allCars.find((car) => car.nid == carId);

  return (
    <>
      <input
        type="checkbox"
        id={`${listTitle} ${car?.title}`}
        onClick={() => updateFavorite(carId)}
        className="hidden"
        name="favorite"
        data-testid={`favorite-car-${car?.nid}`}
      />
      <label htmlFor={`${listTitle} ${car?.title}`} className="cursor-pointer">
        {car?.field_favorite ? (
          <HeartSVG alt="favorite" />
        ) : (
          <OutlinedHeartSVG alt="favorite" />
        )}
      </label>
    </>
  );
};

export default FavoriteBtn;
