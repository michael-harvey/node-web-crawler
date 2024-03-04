import chalk from "chalk";

export function printReport(pages: Record<string, number>) {
  console.log(chalk.green("\nPrint report started."));

  const pagesList = Object.entries(pages);

  pagesList.sort((a, b) => b[1] - a[1]);

  pagesList.forEach((page) => {
    const message = `Found ${page[1]} internal links to ${page[0]}`;
    console.log(chalk.green(message));
  });

  console.log(chalk.green("Print report completed.\n"));
}
