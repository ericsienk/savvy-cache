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

  it("should have keyed way to cache values", async () => {
    let returnedValue = 0;
    const getValue = (key: string) =>
      new Promise((resolve, reject) => {
        if (key === "test") {
          resolve({ key, returnedValue });
        } else {
          reject("nope " + key);
        }
      });

    const cache = savvy((key) =>
      getValue(key).catch((e) => ({ error: e, returnedValue }))
    );
    expect(await cache.get("test")).toEqual({ key: "test", returnedValue: 0 });
    returnedValue = 1;
    expect(await cache.get("test")).toEqual({ key: "test", returnedValue: 0 });
    expect(await cache.get("error")).toEqual({
      error: "nope error",
      returnedValue: 1,
    });
  });

  it("should break cache after secondsUntilRefresh for key mode", async () => {
    let returnedValue = 0;
    const cache = savvy((key) => ({ key, returnedValue }), 60);
    let currentTime = Date.now();
    const dateMock = jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => currentTime);

    expect(await cache.get("test")).toEqual({ key: "test", returnedValue: 0 });
    expect(await cache.get("test")).toEqual({ key: "test", returnedValue: 0 });

    returnedValue = 1;
    currentTime += 60 * 1000;
    expect(await cache.get("test")).toEqual({ key: "test", returnedValue: 1 });

    dateMock.mockRestore();
  });
});
