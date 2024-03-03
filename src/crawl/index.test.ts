import { describe, expect, test } from "@jest/globals";
import { normaliseURL } from "./index";

describe("normaliseURL function", () => {
  test("should handle valid URLs without throwing errors", () => {
    expect(normaliseURL("https://blog.boot.dev/path/")).not.toBeNull();
  });

  test("should handle invalid URLs by returning null", () => {
    const invalidUrl = "invalid-url";
    expect(normaliseURL(invalidUrl)).toBeNull();
  });

  test("normaliseURL returns a normalised URL", () => {
    const normalisedUrl = "blog.boot.dev/path";
    expect(normaliseURL("https://blog.boot.dev/path/")).toBe(normalisedUrl);
    expect(normaliseURL("https://blog.boot.dev/path")).toBe(normalisedUrl);
    expect(normaliseURL("http://blog.boot.dev:8080/path")).toBe(normalisedUrl);
  });
});
