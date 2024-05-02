import { fireEvent, render, screen } from "@testing-library/react";
import GalleryPhoto from "./GalleryPhoto";
import { photoMock } from "../tests/mocks/photos";

describe("GalleryPhoto", () => {
  const onStarMock = vi.fn();
  const defaultProps = {
    ...photoMock,
    onStar: onStarMock,
  };

  it("renders the star icon when not starred", () => {
    render(<GalleryPhoto {...defaultProps} />);

    expect(screen.getByAltText("Not Starred")).toBeDefined();
  });

  it("renders the star icon when starred", () => {
    render(<GalleryPhoto {...defaultProps} isStarred={true} />);

    expect(screen.getByAltText("Starred")).toBeDefined();
  });

  it("renders the thumbnail", () => {
    const { getByTestId } = render(<GalleryPhoto {...defaultProps} />);

    const thumbnail = getByTestId("thumbnail");
    expect(thumbnail).toBeDefined();
    expect(thumbnail).toHaveStyle(`background-image: url(srcTiny)`);
  });

  it("renders the info texts", () => {
    render(<GalleryPhoto {...defaultProps} />);

    expect(screen.getByText("Photographer's Name")).toBeDefined();
    expect(screen.getByText("Alt text")).toBeDefined();
    expect(screen.getByText("#FFFFFF")).toBeDefined();
    expect(screen.getByText("#FFFFFF")).toHaveStyle(`color: #FFFFFF`);
  });

  it("renders the average color square", () => {
    render(<GalleryPhoto {...defaultProps} />);

    const avgColorSquare = screen.getByTestId("avgColorSquare");
    expect(avgColorSquare).toBeDefined();
    expect(avgColorSquare).toHaveStyle(`background: #FFFFFF`);
  });

  it("renders the portfolio link", () => {
    render(<GalleryPhoto {...defaultProps} />);

    expect(screen.getByTestId("linkImg")).toBeDefined();

    const link = screen.getByRole("link", { name: "Porftolio" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("photographerUrl");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("on clicking the star icon, triggers callback", () => {
    render(<GalleryPhoto {...defaultProps} />);

    fireEvent.click(screen.getByAltText("Not Starred"));

    expect(onStarMock).toHaveBeenCalledTimes(1);
    expect(onStarMock).toHaveBeenCalledWith("1", "POST");

    fireEvent.click(screen.getByAltText("Starred"));

    expect(onStarMock).toHaveBeenCalledTimes(2);
    expect(onStarMock).toHaveBeenCalledWith("1", "DELETE");

    expect(screen.getByAltText("Not Starred"));
  });
});
