import { snakeToCamelCase } from "./snakeToCamelCase";

describe(snakeToCamelCase, () => {
  it("works properly", () => {
    const snakeObject = {
      property_one: "one",
      property_two: "two",
    };
    const camelObject = {
      propertyOne: "one",
      propertyTwo: "two",
    };

    const result = snakeToCamelCase(snakeObject);

    expect(result).toMatchObject(camelObject);
  });
});
