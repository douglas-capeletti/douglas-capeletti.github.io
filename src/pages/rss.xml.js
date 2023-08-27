import rss from "@astrojs/rss";

const postImportResult = import.meta.globEager("./posts/*.md");
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: 'Capeletti.dev',
    description: 'Portifolio and blog of a software engineer.',
    site: import.meta.env.SITE,
    items: import.meta.glob("./posts/**/*.md"),
  });
