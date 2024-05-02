import '@testing-library/jest-dom/vitest'
import { expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import * as matchers from "@testing-library/jest-dom/matchers"
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

declare module "vitest" {
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

afterEach(() => {
  cleanup();
})
