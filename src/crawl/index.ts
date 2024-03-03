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
