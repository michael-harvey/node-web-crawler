import { crawlPage } from "./crawl";

async function main() {
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

  const baseUrl = args[2];

  console.log(`Crawling started on URL: ${baseUrl}`);

  const pages = await crawlPage(baseUrl, baseUrl, {});
  console.log(pages);
}

main();
