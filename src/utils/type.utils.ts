export type AsyncReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
