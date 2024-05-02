import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders properly", () => {
    render(<Logo />);

    expect(screen.getByAltText("Logo")).toBeDefined();
  });
});
