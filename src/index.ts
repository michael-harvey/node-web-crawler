// import { normaliseURL, getURLsFromHTML } from "./crawl";

function main() {
  const args = process.argv;
  console.log(args.length);

  if (args.length < 3) {
    console.error("Please provide a target URL, i.e. https://www.google.com");
    process.exit();
  }

  if (args.length > 3) {
    console.error("Too many arguments given");
    process.exit();
  }

  const targetUrl = args[2];

  console.log(`Crawling started on URL: ${targetUrl}`);
}

main();
