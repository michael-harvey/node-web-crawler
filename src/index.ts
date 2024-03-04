import chalk from "chalk";
import { crawlPage } from "./crawl";
import { printReport } from "./report";

async function main() {
  const args = process.argv;
  console.log(args.length);

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

  console.log(chalk.green(`Crawling started on URL: ${baseUrl}`));

  const pages = await crawlPage(baseUrl, baseUrl, {});

  if (!pages) {
    console.error(chalk.red("Crawling finished. No links found."));
    process.exit();
  }

  printReport(pages);
}

main();
