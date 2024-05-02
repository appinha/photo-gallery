import { HttpResponse, http } from "msw";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginScreen from "./LoginScreen";
import { server } from "../tests/server-mock/server";
import { API_URL } from "../constants";
import * as saveUserToken from "../utils/saveUserToken";
import { navigateMock } from "../tests/setup";
import { Screen } from "../navigator";

describe("LoginScreen", () => {
  const saveUserTokenSpy = vi.spyOn(saveUserToken, "default");

  const correctlyFillForm = async () => {
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "my_username" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "my_password" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("my_username")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("my_password")).toBeDefined();
    });
  };

  beforeEach(() => {
    server.use(
      http.post(`${API_URL}/users/sign-in`, () => HttpResponse.json({ token: "tokenMock" })),
    );
  });

  it("renders the logo", () => {
    render(<LoginScreen />);

    expect(screen.getByAltText("Logo")).toBeDefined();
  });

  it("renders the title", () => {
    render(<LoginScreen />);

    expect(screen.getByText("Sign in to your account")).toBeDefined();
  });

  it("renders the form", () => {
    render(<LoginScreen />);

    expect(screen.getByLabelText("Username")).toBeDefined();
    expect(screen.getByTestId("usernameInput")).toHaveAttribute("type", "text");
    expect(screen.getByPlaceholderText("Enter your username here")).toBeDefined();
    expect(screen.getByTestId("errorUsername")).toHaveTextContent("");

    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByTestId("passwordInput")).toHaveAttribute("type", "password");
    expect(screen.getByPlaceholderText("Enter your password here")).toBeDefined();
    expect(screen.getByTestId("errorPassword")).toHaveTextContent("");

    expect(screen.getAllByDisplayValue("")).toHaveLength(2);

    expect(screen.getByRole("button")).toHaveTextContent("Sign in");
  });

  it("on value input, renders the new values", async () => {
    render(<LoginScreen />);

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "my_username" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "my_password" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("my_username")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("my_password")).toBeDefined();
    });
  });

  describe("on submit complete form", () => {
    it("if user is authorized, navigates to Photo Gallery page", async () => {
      render(<LoginScreen />);

      correctlyFillForm();

      fireEvent.click(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(navigateMock).toHaveBeenCalledTimes(1);
      });

      expect(navigateMock).toHaveBeenCalledWith(Screen.Gallery);

      expect(saveUserTokenSpy).toHaveBeenCalledTimes(1);
      expect(saveUserTokenSpy).toHaveBeenCalledWith("tokenMock");
    });

    it("if user is authorized, but no token is returned, renders error text", async () => {
      server.use(http.post(`${API_URL}/users/sign-in`, () => HttpResponse.json({})));

      render(<LoginScreen />);

      correctlyFillForm();

      fireEvent.click(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(screen.getByText("Something went wrong, try again later")).toBeDefined();
      });

      expect(navigateMock).toHaveBeenCalledTimes(0);
    });

    it("if user is not authorized, renders error text", async () => {
      server.use(
        http.post(
          `${API_URL}/users/sign-in`,
          () => new HttpResponse("Unauthorized", { status: 401 }),
        ),
      );

      render(<LoginScreen />);

      correctlyFillForm();

      fireEvent.click(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(screen.getByText("Incorrect username or password")).toBeDefined();
      });

      expect(navigateMock).toHaveBeenCalledTimes(0);
    });

    it("on server error, renders error text", async () => {
      server.use(
        http.post(
          `${API_URL}/users/sign-in`,
          () => new HttpResponse("Server error", { status: 500 }),
        ),
      );

      render(<LoginScreen />);

      correctlyFillForm();

      fireEvent.click(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(screen.getByText("Something went wrong, try again later")).toBeDefined();
      });

      expect(navigateMock).toHaveBeenCalledTimes(0);
    });
  });

  describe("on submit incomplete form", () => {
    it("with missing username and password, renders the error message", () => {
      render(<LoginScreen />);

      fireEvent.click(screen.getByText("Sign in"));

      expect(screen.getByText("Please provide a username and password")).toBeDefined();
    });

    it("with missing username, renders the error message", async () => {
      render(<LoginScreen />);

      fireEvent.change(screen.getByLabelText("Password"), { target: { value: "my_password" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("my_password")).toBeDefined();
      });

      fireEvent.click(screen.getByText("Sign in"));

      expect(screen.getByText("Please provide a username")).toBeDefined();
    });

    it("with missing password, renders the error message", async () => {
      render(<LoginScreen />);

      fireEvent.change(screen.getByLabelText("Username"), { target: { value: "my_username" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("my_username")).toBeDefined();
      });

      fireEvent.click(screen.getByText("Sign in"));

      expect(screen.getByText("Please provide a password")).toBeDefined();
    });
  });
});
