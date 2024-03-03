import { JSDOM } from "jsdom";

export function normaliseURL(url: string) {
  try {
    const newUrl = new URL(url);

    const normalisedPath = newUrl.pathname.endsWith("/")
      ? newUrl.pathname.slice(0, -1)
      : newUrl.pathname;

    return newUrl.hostname + normalisedPath;
  } catch {
    console.log("Invalid URL");
    return null;
  }
}

export function getURLsFromHTML(htmlBody: string, baseURL: string) {
  const { window } = new JSDOM(htmlBody, {
    url: baseURL,
  });

  const anchors = window.document.querySelectorAll("a");
  const anchorUrls: string[] = [];

  anchors.forEach((anchor) => {
    anchorUrls.push(anchor.href);
  });

  return anchorUrls;
}
