import chalk from "chalk";
import { crawlPage } from "./crawl";
import { printReport } from "./report";

async function main() {
  const args = process.argv;

  if (args.length < 3) {
    console.error(
      chalk.red("Please provide a target URL, i.e. https://www.google.com"),
    );
    process.exit();
  }

  if (args.length > 3) {
    console.error(chalk.red("Too many arguments given"));
    process.exit();
  }

  const baseUrl = args[2];

  const t0 = performance.now();
  console.log(chalk.green(`\nCrawling started on URL: ${baseUrl}`));

  const pages = await crawlPage(baseUrl, baseUrl, {});

  const t1 = performance.now();
  const message = `Crawling completed in ${Math.round(t1 - t0)} milliseconds. ${Object.keys(pages).length} unique pages found.`;
  console.log(chalk.green(message));

  if (!pages) {
    console.error(chalk.red("0 page links found."));
    process.exit();
  }

  printReport(pages);
}

main();
