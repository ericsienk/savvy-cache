import savvy from ".";

describe("savvy", () => {
  it("should return cache before secondsUntilRefresh", async () => {
    let returnedValue = 0;
    const cache = savvy(() => returnedValue, 60);
    let currentTime = Date.now();
    const dateMock = jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => currentTime);

    expect(await cache.get()).toEqual(0);

    returnedValue = 1;
    currentTime += 59;
    expect(await cache.get()).toEqual(0);

    dateMock.mockRestore();
  });

  it("should break cache after secondsUntilRefresh", async () => {
    let returnedValue = 0;
    const cache = savvy(() => returnedValue, 60);
    let currentTime = Date.now();
    const dateMock = jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => currentTime);

    expect(await cache.get()).toEqual(0);

    returnedValue = 1;
    currentTime += 60 * 1000;
    expect(await cache.get()).toEqual(1);

    dateMock.mockRestore();
  });
});
