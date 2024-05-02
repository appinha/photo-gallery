import { photoMock, remotePhotoMock } from "../tests/mocks/photos";
import { photosAdapter } from "./adapters";

describe(photosAdapter, () => {
  it("works properly", () => {
    const result = photosAdapter([remotePhotoMock]);

    expect(result[0]).toMatchObject(photoMock);
  });
});
