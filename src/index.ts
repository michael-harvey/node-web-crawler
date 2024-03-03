import { normaliseURL } from "./crawl";

normaliseURL("https://blog.boot.dev/path/");
normaliseURL("https://blog.boot.dev/path");
normaliseURL("http://blog.boot.dev/path/");
normaliseURL("http://blog.boot.dev/path");
normaliseURL("http://blog.boot.dev:8080/path");
normaliseURL("http://blog.boot.dev/path?sort=asc");
normaliseURL("3og");
