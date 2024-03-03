import { describe, expect, test } from "@jest/globals";
import { normaliseURL, getURLsFromHTML } from "./index";

describe("normaliseURL function", () => {
  test("should handle valid URLs without throwing errors", () => {
    expect(normaliseURL("https://blog.boot.dev/path/")).not.toBeNull();
  });

  test("should handle invalid URLs by returning null", () => {
    const invalidUrl = "invalid-url";
    expect(normaliseURL(invalidUrl)).toBeNull();
  });

  test("should return a normalised URL", () => {
    const normalisedUrl = "blog.boot.dev/path";
    expect(normaliseURL("https://blog.boot.dev/path/")).toBe(normalisedUrl);
    expect(normaliseURL("https://blog.boot.dev/path")).toBe(normalisedUrl);
    expect(normaliseURL("http://blog.boot.dev:8080/path")).toBe(normalisedUrl);
  });
});

describe("getURLsFromHTML function", () => {
  test("should append baseUrl to relative links", () => {
    expect(
      getURLsFromHTML("<a href='/path'>Link</a>", "https://blog.boot.dev"),
    ).toContain("https://blog.boot.dev/path");
    expect(
      getURLsFromHTML("<a href='/path'>Link</a>", "https://blog.boot.dev"),
    ).toHaveLength(1);
  });

  test("should return an array of links", () => {
    expect(
      getURLsFromHTML(
        "<a href='/path'>Link</a><a href='/path1'>Link1</a><a href='/path2'>Link2</a>",
        "https://blog.boot.dev",
      ),
    ).toHaveLength(3);
  });

  test("should not modify absolute links", () => {
    expect(
      getURLsFromHTML(
        "<a href='https://www.google.com/path'>Link</a>",
        "https://blog.boot.dev",
      ),
    ).toContain("https://www.google.com/path");
  });
});
