import LoadMoreBtn from "@/app/components/LoadMoreBtn";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Show more button", () => {
  it("should have 'Show more' text", () => {
    const mockBtnClick = jest.fn();
    render(<LoadMoreBtn onBtnClick={mockBtnClick} />);
    const text = screen.getByText("Show more");
    expect(text).toBeInTheDocument;
  });

  it("should call onBtnClick prop when clicked", () => {
    const mockBtnClick = jest.fn();
    render(<LoadMoreBtn onBtnClick={mockBtnClick} />);
    fireEvent.click(screen.getByText(/Show more/i));
    expect(mockBtnClick).toHaveBeenCalledTimes(1);
  });
});
