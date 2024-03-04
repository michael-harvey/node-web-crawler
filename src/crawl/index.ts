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

  anchors.forEach((anchor) => anchorUrls.push(anchor.href));

  return anchorUrls;
}

export async function crawlPage(
  baseUrl: string,
  currentUrl: string,
  pages: Record<string, number>,
) {
  // if the currentUrl is not the same domain as baseUrl, abort early
  if (new URL(baseUrl).hostname !== new URL(currentUrl).hostname) {
    return pages;
  }

  const normalisedCurrentUrl = normaliseURL(currentUrl);
  if (!normalisedCurrentUrl) return pages;

  if (pages.hasOwnProperty(normalisedCurrentUrl)) {
    pages[normalisedCurrentUrl] += 1;
    return pages;
  } else {
    pages[normalisedCurrentUrl] = baseUrl === currentUrl ? 0 : 1;
  }

  const html = await fetchHtml(currentUrl);
  const links = getURLsFromHTML(html!, baseUrl);

  links.forEach((link) => {
    crawlPage(baseUrl, link, pages);
  });

  return pages;
}

async function fetchHtml(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Target url: ${url} returned a ${response.status} code`);
      return;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("text/html")) {
      console.error("Response content-type is not valid html");
      return;
    }

    return await response.text();
  } catch (error) {
    console.log(`Invalid url: ${error}`);
  }
}
