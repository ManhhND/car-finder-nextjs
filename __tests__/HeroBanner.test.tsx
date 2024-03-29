import HeroBanner from "@/app/components/HeroBanner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      refresh: () => jest.fn(),
    };
  },
}));

describe("Hero banner", () => {
  it("should have title", () => {
    render(<HeroBanner />);
    const heading = screen.getByRole("heading", {
      name: "The Best Platform for Car Rental",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should have an image", () => {
    render(<HeroBanner />);
    const heroImg = screen.getByTestId("hero-image");
    expect(heroImg).toBeInTheDocument();
  });

  it("image should have 'CarFinder banner' alt text", () => {
    render(<HeroBanner />);
    const heroImg = screen.getByTestId("hero-image");
    expect(heroImg).toHaveAttribute("alt", "CarFinder banner");
  });

  it("image should have mobile src when screen size < 768px", () => {
    global.innerWidth = 450;
    const mobileBanner = "/hero-banner-mobile.svg";
    render(<HeroBanner />);
    const heroImg = screen.getByTestId("hero-image");
    expect(heroImg).toHaveAttribute("src", mobileBanner);
  });
});
