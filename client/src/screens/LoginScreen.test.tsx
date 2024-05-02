import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginScreen from "./LoginScreen";

describe("LoginScreen", () => {
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
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue("my_password")).toBeDefined();
    })
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
      })

      fireEvent.click(screen.getByText("Sign in"));

      expect(screen.getByText("Please provide a username")).toBeDefined();
    });

    it("with missing password, renders the error message", async () => {
      render(<LoginScreen />);

      fireEvent.change(screen.getByLabelText("Username"), { target: { value: "my_username" } });

      await waitFor(() => {
        expect(screen.getByDisplayValue("my_username")).toBeDefined();
      })

      fireEvent.click(screen.getByText("Sign in"));

      expect(screen.getByText("Please provide a password")).toBeDefined();
    });
  });
});
