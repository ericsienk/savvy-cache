type PromiseLike<T> = T | Promise<T>;
const KEYLESS = Symbol("keyless");

export default <T = any>(
  getValueToCache: ((key: string) => PromiseLike<T>) | (() => PromiseLike<T>),
  secondsUntilRefresh: number = Infinity
) => {
  const cache: any = {};
  return {
    get: async (key?: string): Promise<T> => {
      const accessor = key || KEYLESS;

      if (accessor in cache) {
        const { value, lastRefreshTimestamp } = cache[accessor];

        if ((Date.now() - lastRefreshTimestamp) / 1000 < secondsUntilRefresh) {
          return value;
        }
      }

      const lastRefreshTimestamp = Date.now();
      const value = getValueToCache(key as any);
      cache[accessor] = { value, lastRefreshTimestamp };

      return value;
    },
  };
};
