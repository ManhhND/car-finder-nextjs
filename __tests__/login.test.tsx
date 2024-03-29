import Login from "@/app/login/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: () => jest.fn(),
    };
  },
}));

jest.mock("@/app/api", () => ({
  userLogIn: () => jest.fn(),
}));

describe("Login page", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;
  });
  it("should have Login text", () => {
    render(<Login />);
    const myElem = screen.getByText("Log in");
    expect(myElem).toBeInTheDocument();
  });

  it("should have username and password input fields", () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should have a login button", () => {
    render(<Login />);
    const loginBtn = screen.getByTitle("Login");
    expect(loginBtn).toBeInTheDocument();
  });

  it("should login successful", async () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginBtn = screen.getByTitle("Login");
    await userEvent.type(usernameInput, "admin");
    await userEvent.type(passwordInput, "123");
    fireEvent.click(loginBtn);
    waitFor(() => {
      expect(loginBtn).toBeDisabled();
    });
  });

  it("should login failed", async () => {
    (global.fetch as jest.Mock).mockReturnValueOnce(
      Promise.resolve({
        message: "login failed",
      }),
    );
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginBtn = screen.getByTitle("Login");
    await userEvent.type(usernameInput, "admin");
    await userEvent.type(passwordInput, "admin");
    fireEvent.click(loginBtn);
    waitFor(() => {
      expect(loginBtn).toBeDisabled();
    });
  });
});
