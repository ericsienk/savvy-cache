export default <T>(
  getValueToCache: () => Promise<T> | T,
  secondsUntilRefresh: number
) => {
  let lastRefreshTimestamp = 0;
  let lastCachedValue: T;
  return {
    get: async (): Promise<T> => {
      if ((Date.now() - lastRefreshTimestamp) / 1000 >= secondsUntilRefresh) {
        lastCachedValue = await getValueToCache();
        lastRefreshTimestamp = Date.now();
      }

      return lastCachedValue;
    },
  };
};
