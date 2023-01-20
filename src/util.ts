export const inferWhenArgType = <T>(
  fn: (x: T) => boolean
): ((x: T) => boolean) => fn;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const ensureArray = (ar: unknown) =>
  Array.isArray(ar) ? ar : [ar].filter((f) => f !== undefined);
