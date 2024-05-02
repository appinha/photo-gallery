type Snake = Lowercase<`${string}_${string}`>;

type SnakeToCamel<S extends string> = S extends `${infer Start}_${infer Rest}`
  ? `${Start}${Capitalize<SnakeToCamel<Rest>>}`
  : S;

function capitalize<S extends string>(string: S): Capitalize<S> {
  if (string.length === 0) return "" as never;

  return (string[0].toUpperCase() + string.slice(1)) as never;
}

function snakeToCamel<S extends string>(string: S): SnakeToCamel<S> {
  const [start, ...rest] = string.split("_");

  return (start + rest.map(capitalize).join("")) as never;
}

export function snakeToCamelCase<O extends object, K extends keyof O>(
  object: O,
): {
  [P in K as P extends Snake ? SnakeToCamel<P> : P]: O[P];
} {
  return Object.entries(object).reduce(
    (result, [key, value]) => ({
      ...result,
      [snakeToCamel(key)]: value,
    }),
    {},
  ) as never;
}
