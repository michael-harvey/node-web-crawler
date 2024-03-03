import { describe, expect, test } from "@jest/globals";
import { normaliseURL, getURLsFromHTML } from "./index";

describe("normaliseURL function", () => {
  // TODO:
  // protocol
  // slash
  // capitals
  // http
  test("should handle valid URLs without throwing errors", () => {
    const validUrl = "https://blog.boot.dev/path/";
    expect(normaliseURL(validUrl)).not.toBeNull();
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
  // TODO:
  // absolute
  // relative
  // both
  // handle error
  test("should append baseUrl to relative links", () => {
    const linkHtml = "<a href='/path'>Link</a>";
    const baseUrl = "https://blog.boot.dev";
    expect(getURLsFromHTML(linkHtml, baseUrl)).toContain(
      "https://blog.boot.dev/path",
    );
    expect(getURLsFromHTML(linkHtml, baseUrl)).toHaveLength(1);
  });

  test("should return an array of links", () => {
    const multipleLinksHtml =
      "<a href='/path'>Link</a><a href='/path1'>Link1</a><a href='/path2'>Link2</a>";
    const baseUrl = "https://blog.boot.dev";
    expect(getURLsFromHTML(multipleLinksHtml, baseUrl)).toHaveLength(3);
  });

  test("should not modify absolute links", () => {
    const absoluteLinkHtml = "<a href='https://www.google.com/path'>Link</a>";
    const baseUrl = "https://blog.boot.dev";
    expect(getURLsFromHTML(absoluteLinkHtml, baseUrl)).toContain(
      "https://www.google.com/path",
    );
  });
});
