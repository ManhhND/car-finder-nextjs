import FavoriteBtn from "@/app/components/FavoriteBtn";
import { CarContextProvider } from "@/context/CarContext";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Favorite button", () => {
  it("should update favorite car when clicked", () => {
    render(
      <CarContextProvider>
        <FavoriteBtn carId={1} listTitle="test" />
      </CarContextProvider>,
    );
    const favoriteBtn = screen.getByRole("checkbox");
    expect(favoriteBtn).toBeInTheDocument();
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeChecked();
  });
});
