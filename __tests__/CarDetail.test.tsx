import CarDetail from "@/app/car/[id]/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { arrOneCar } from "./utils/test-data";

describe("Car detail page", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(arrOneCar),
      }),
    ) as jest.Mock;
  });

  it("successfully fetches data and renders with the correct props", async () => {
    const resolve = await CarDetail({ params: { id: "1" } });
    render(resolve);
    waitFor(() => expect(screen.getByText(/toyota/i)).toBeInTheDocument());
  });
});
