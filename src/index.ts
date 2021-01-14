type PromiseLike<T> = T | Promise<T>;
const KEYLESS = Symbol("keyless");

export default <T = any>(
  getValueToCache: ((key: string) => PromiseLike<T>) | (() => PromiseLike<T>),
  secondsUntilRefresh: number = Infinity
) => {
  let cache: any = {};
  let lastRefreshTimestamp = 0;
  return {
    get: async (key?: string): Promise<T> => {
      let accessor = key || KEYLESS;
      const isExpired =
        (Date.now() - lastRefreshTimestamp) / 1000 >= secondsUntilRefresh;
      if (accessor in cache && !isExpired) {
        return cache[accessor];
      }

      lastRefreshTimestamp = Date.now();
      const value = getValueToCache(key as any);
      cache[accessor] = value;
      return value;
    },
  };
};
