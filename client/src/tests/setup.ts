import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as navigator from "../navigator";
import { server } from "./server-mock/server";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

export const navigateMock = vi.fn();
vi.spyOn(navigator, "useNavigation").mockReturnValue({ navigate: navigateMock });

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  navigateMock.mockReset();
});

afterAll(() => {
  server.close();
});
