import { userLogIn } from "@/app/api";
import { authenticate } from "@/app/api/actions";
import Login from "@/app/login/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { redirect } from "next/navigation";
import { user } from "./utils/test-data";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      refresh: () => jest.fn(),
    };
  },
}));

jest.mock("@/app/api", () => ({
  userLogIn: jest.fn(),
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
    // render(<Login />);
    const formData = { username: "aem2", password: "123" };

    (userLogIn as jest.Mock).mockResolvedValueOnce(user);

    const response = await authenticate(formData);
    console.log(response);
    

    expect(response).toBe(user)
    // const usernameInput = screen.getByPlaceholderText("Username");
    // const passwordInput = screen.getByPlaceholderText("Password");
    // const loginBtn = screen.getByTitle("Login");
    // await userEvent.type(usernameInput, "aem2");
    // await userEvent.type(passwordInput, "123");
    // fireEvent.click(loginBtn);
    // waitFor(async () => {
    //   const res = await userLogIn({ username: "aem2", password: "123" });
    //   expect(loginBtn).toBeDisabled();
    //   expect(res.message).not.toBeTruthy();
    //   expect(redirect).toHaveBeenCalledWith("/");
    // });
  });

  it("should login failed", async () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginBtn = screen.getByTitle("Login");
    await userEvent.type(usernameInput, "fail");
    await userEvent.type(passwordInput, "fail");
    fireEvent.click(loginBtn);
    waitFor(async () => {
      const res = await userLogIn({ username: "fail", password: "fail" });
      expect(res.message).toBeTruthy();
      expect(screen.getByText(/sorry/i)).toBeInTheDocument();
    });
  });
});
