import {searchTerm} from "../../../oereb_client/static/src/request/search";

beforeEach(() => {
  fetch.resetMocks();
});

describe("searchTerm", () => {

  it("should query search results", async () => {
    fetch.mockResponseOnce(JSON.stringify({foo: "bar"}));
    const result = await searchTerm("http://example.com/", "test", "en").promise;
    expect(result).toEqual({
      foo: "bar"
    });
    expect(fetch.mock.calls).toHaveLength(1);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.host).toEqual("example.com");
    expect(url.pathname).toEqual("/");
    expect(url.searchParams.get("term")).toEqual("test");
    expect(url.searchParams.get("lang")).toEqual("en");
  });

  it("should reject on failed request", async () => {
    const error = new Error("Request failed");
    fetch.mockReject(() => Promise.reject(error));
    const result = searchTerm("http://example.com/", "test", "en").promise;
    await expect(result).rejects.toEqual(error);
  });

  it("should reject canceled request", async () => {
    const search = searchTerm("http://example.com/", "test", "en");
    search.cancel();
    await expect(search.promise).rejects.toEqual(new Error("Request canceled"));
  });

});