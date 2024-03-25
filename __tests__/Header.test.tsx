import SearchBar from "@/app/components/SearchBar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { allCars } from "./utils/test-data";

describe("Search box", () => {
  it("should have an input", () => {
    render(<SearchBar data={allCars} />);
    expect(
      screen.getByPlaceholderText(/Search for your car/i),
    ).toBeInTheDocument();
  });

  it("should display BMW car when type in 'bmw'", async () => {
    render(<SearchBar data={allCars} />);
    const searchInput = screen.getByPlaceholderText(/Search for your car/i);
    await userEvent.type(searchInput, "bmw");
    const searchItems = screen.getAllByTestId("search-item");
    expect(searchItems).toBeTruthy();
  });
});
