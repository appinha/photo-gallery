import { render, screen, waitFor } from "@testing-library/react";
import PhotoGalleryScreen from "./PhotoGalleryScreen";

describe("Logo", () => {
  it("renders the logo", () => {
    render(<PhotoGalleryScreen />);

    expect(screen.getByAltText("Logo")).toBeDefined();
  });

  it("renders the title", () => {
    render(<PhotoGalleryScreen />);

    expect(screen.getByText("All photos")).toBeDefined();
  });

  it("renders the loading state", () => {
    render(<PhotoGalleryScreen />);

    expect(screen.getByText("Loading...")).toBeDefined();
  });
});
