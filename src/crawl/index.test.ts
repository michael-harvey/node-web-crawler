import { describe, expect, test } from "@jest/globals";
import { normaliseURL, getURLsFromHTML } from "./index";

describe("normaliseURL function", () => {
  const normalisedUrl = "www.google.com/path";

  test("should return url without protocol", () => {
    expect(normaliseURL("https://www.google.com/path/")).toBe(normalisedUrl);
  });

  test("should return url without trailing slash", () => {
    expect(normaliseURL("https://www.google.com/path/")).toBe(normalisedUrl);
  });

  test("should return url without capitals", () => {
    expect(normaliseURL("https://www.GOOGLE.com/path/")).toBe(normalisedUrl);
  });

  test("should return url without port", () => {
    expect(normaliseURL("https://www.google.com:8080/path/")).toBe(
      normalisedUrl,
    );
  });

  test("should not return null for valid URLs", () => {
    expect(normaliseURL("https://www.google.com/path/")).not.toBeNull();
  });

  test("should handle invalid URLs by returning null", () => {
    expect(normaliseURL("invalid-url")).toBeNull();
  });
});

describe("getURLsFromHTML function", () => {
  test("should append baseUrl to relative links", () => {
    expect(
      getURLsFromHTML("<a href='/path'>Link</a>", "https://www.google.com"),
    ).toEqual(expect.arrayContaining(["https://www.google.com/path"]));
  });

  test("should return an array of link strings", () => {
    expect(
      getURLsFromHTML(
        "<a href='/path'>Link</a><a href='/path1'>Link1</a><a href='/path2'>Link2</a>",
        "https://www.google.com",
      ),
    ).toEqual(
      expect.arrayContaining([
        "https://www.google.com/path",
        "https://www.google.com/path1",
        "https://www.google.com/path2",
      ]),
    );
  });

  test("should not modify absolute links with baseUrl", () => {
    expect(
      getURLsFromHTML(
        "<a href='https://mail.google.com/absolute'>Link</a>",
        "https://www.google.com",
      ),
    ).toEqual(expect.arrayContaining(["https://mail.google.com/absolute"]));
  });

  test("should handle both relative and absolute links", () => {
    expect(
      getURLsFromHTML(
        "<a href='https://mail.google.com/absolute'>Link</a><a href='/relative'>Link</a>",
        "https://www.google.com",
      ),
    ).toEqual(
      expect.arrayContaining([
        "https://mail.google.com/absolute",
        "https://www.google.com/relative",
      ]),
    );
  });
});
