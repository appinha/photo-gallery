import * as getUserToken from "./getUserToken";
import isUserSignedIn from "./isUserSignedIn";

describe(isUserSignedIn, () => {
  it("returns true when there isn't a token defined", () => {
    const result = isUserSignedIn();

    expect(result).toBe(false);
  });

  it("returns true when there's a token defined", () => {
    vi.spyOn(getUserToken, "default").mockReturnValueOnce("tokenMock");

    const result = isUserSignedIn();

    expect(result).toBe(true);
  });
});
