import CarList from "@/app/components/CarList";
import { CarContext, CarContextProvider } from "@/context/CarContext";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { allCars } from "./utils/test-data";

const itemsOnFirstPage = 8;
const itemsPerPage = 4;
const currentPage = 0;
const totalPages = Math.round(
  (allCars.length - itemsOnFirstPage) / itemsPerPage,
);
const pagerList = allCars.slice(
  0,
  itemsOnFirstPage + itemsPerPage * currentPage,
);
const mockLoadMore = jest.fn();

describe("All cars list", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(allCars),
      }),
    ) as jest.Mock;
  });

  it("fetches data and updates state on mount", () => {
    render(
      <CarContextProvider>
        <CarList
          listTitle="All Cars"
          data={allCars}
          hasPager={false}
          totalPages={1}
          currentPage={0}
          onLoadMore={mockLoadMore}
        />
      </CarContextProvider>,
    );
    waitFor(() =>
      expect(screen.getByText(/Chevrolet Equinox/i)).toBeInTheDocument(),
    );
  });

  it("fails to fetch data", () => {
    (global.fetch as jest.Mock).mockReturnValueOnce(
      Promise.resolve({
        status: 403,
        json: () => Promise.resolve(allCars),
      }),
    );
    render(
      <CarContextProvider>
        <CarList
          listTitle="All Cars"
          data={allCars}
          hasPager={false}
          totalPages={1}
          currentPage={0}
          onLoadMore={mockLoadMore}
        />
      </CarContextProvider>,
    );
    waitFor(() =>
      expect(screen.getByText(/Chevrolet Equinox/i)).toBeInTheDocument(),
    );
  });

  it("should have title", () => {
    const updateFavorite = jest.fn();
    const setAllCars = jest.fn();
    render(
      <CarContext.Provider value={{ allCars, setAllCars, updateFavorite }}>
        <CarList
          listTitle="All Cars"
          data={pagerList}
          hasPager={true}
          totalPages={totalPages}
          currentPage={currentPage}
          onLoadMore={mockLoadMore}
        />
      </CarContext.Provider>,
    );

    const heading = screen.getByRole("heading", {
      name: "All Cars",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should have a 'Show more' button", () => {
    render(
      <CarContextProvider>
        <CarList
          listTitle="All Cars"
          data={pagerList}
          hasPager={true}
          totalPages={3}
          currentPage={currentPage}
          onLoadMore={mockLoadMore}
        />
      </CarContextProvider>,
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});
