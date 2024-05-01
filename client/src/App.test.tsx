import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the Sign In page if user is not signed in", () => {
    render(<App />);

    expect(screen.getByText("Sign in to your account")).toBeDefined();
  });
});
