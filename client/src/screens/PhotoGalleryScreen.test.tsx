import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PhotoGalleryScreen from "./PhotoGalleryScreen";
import * as getUserToken from "../utils/getUserToken";
import { server } from "../tests/server-mock/server";
import { HttpResponse, http } from "msw";
import { API_URL } from "../constants";
import { photoMock1, photoMock2 } from "../tests/mocks/photos";
import { navigateMock } from "../tests/setup";
import { Screen } from "../navigator";

describe("Logo", () => {
  const photosMock = [photoMock1, photoMock2];

  beforeEach(() => {
    vi.spyOn(getUserToken, "default").mockReturnValueOnce("tokenMock");

    server.use(http.get(`${API_URL}/photos`, () => HttpResponse.json({ photos: photosMock })));
  });

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

  it("renders photos", async () => {
    render(<PhotoGalleryScreen />);

    await waitFor(() => {
      expect(screen.getByText(photoMock1.photographer)).toBeDefined();
    });

    expect(screen.getByText(photoMock2.photographer)).toBeDefined();
  });

  it("renders error message on server error", async () => {
    server.use(
      http.get(`${API_URL}/photos`, () => new HttpResponse("Server error", { status: 500 })),
    );

    render(<PhotoGalleryScreen />);

    await waitFor(() => {
      expect(screen.getByText("An error has occurred, please try again")).toBeDefined();
    });
  });

  it("navigates to Sign In page if there's no token available", async () => {
    vi.spyOn(getUserToken, "default").mockReturnValueOnce("");

    render(<PhotoGalleryScreen />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    expect(navigateMock).toHaveBeenCalledWith(Screen.Login);
  });

  it("navigates to Sign In page if user is unauthorized", async () => {
    server.use(
      http.get(`${API_URL}/photos`, () => new HttpResponse("Unauthorized", { status: 401 })),
    );

    render(<PhotoGalleryScreen />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    expect(navigateMock).toHaveBeenCalledWith(Screen.Login);
  });

  it("on star click, posts and deletes star", async () => {
    server.use(
      http.post(`${API_URL}/photos/star`, () => new HttpResponse("Star created", { status: 201 })),
      http.delete(
        `${API_URL}/photos/star`,
        () => new HttpResponse("Star deleted", { status: 200 }),
      ),
    );

    render(<PhotoGalleryScreen />);

    await waitFor(() => {
      expect(screen.getAllByAltText("Not Starred")).toHaveLength(2);
    });

    fireEvent.click(screen.getAllByAltText("Not Starred")[0]);

    await waitFor(() => {
      expect(screen.getAllByAltText("Starred")).toHaveLength(1);
    });

    expect(screen.getAllByAltText("Not Starred")).toHaveLength(1);

    fireEvent.click(screen.getByAltText("Starred"));

    await waitFor(() => {
      expect(screen.getAllByAltText("Not Starred")).toHaveLength(2);
    });
  });
});
