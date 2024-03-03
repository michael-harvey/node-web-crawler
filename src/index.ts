import { normaliseURL, getURLsFromHTML } from "./crawl";

normaliseURL("https://blog.boot.dev/path/");

getURLsFromHTML(
  `
  <html>
      <body>
          <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
          <a href="/path"><span>Go to Boot.dev</span></a>
      </body>
  </html>
`,
  "https://blog.boot.dev",
);
