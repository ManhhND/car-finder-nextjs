import CarItem from "@/app/components/CarItem";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { car } from "./utils/test-data";

describe("Car Item", () => {
  it("should have 'Toyota Camry' as title", () => {
    render(<CarItem car={car} listTitle="test" />);
    const carTitle = screen.getByRole("heading", { name: /Toyota Camry/i });
    expect(carTitle).toBeInTheDocument();
  });

  it("should have an image", () => {
    render(<CarItem car={car} listTitle="test" />);
    const carImg = screen.getByRole("img");
    expect(carImg).toBeInTheDocument();
  });

  it("has a favorite checkbox and it should be unchecked", () => {
    render(<CarItem car={car} listTitle="test" />);
    const favoriteCheckbox = screen.getByRole("checkbox");
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).not.toBeChecked();
  });

  it("marked as favorite when clicked", () => {
    const updateFavorite = jest.fn();
    render(<CarItem car={car} listTitle="test" />);
    const favoriteCheckbox = screen.getByRole("checkbox");
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    car.field_favorite = true;
    expect(car.field_favorite).toEqual(true);
  });
});
