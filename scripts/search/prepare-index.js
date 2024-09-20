import path from "path";
import { promises as fs } from "fs";
import { globby } from "globby";
import grayMatter from "gray-matter";

(async function () {
  const index = [];
  const getSlugFromPathname = (pathname) => path.basename(pathname, path.extname(pathname));
  const indexFiles = async (category) => {
    const contentDir = path.join(process.cwd(), "src", "pages", category);
    const contentFilePaths = await globby([path.join(contentDir, "*.md")]);

    if (contentFilePaths.length) {
      const files = contentFilePaths.map(
        async (filePath) => await fs.readFile(filePath, "utf8")
      );
      let i = 0;
      for await (let file of files) {
        const { data: { title, description, tags }, content: body } = grayMatter(file);
        index.push({
          slug: getSlugFromPathname(contentFilePaths[i]),
          category,
          title,
          tags,
          body,
        });
        i++;
      }
      console.log(`Indexed ${i} posts from ${contentDir}`);
    }
  }

  await indexFiles("drafts")
  await indexFiles("notes")
  await indexFiles("shards")
  if (index.length > 0) {
    const indexOutputFile = path.join(process.cwd(), "public", "search-index.json");
    await fs.writeFile(indexOutputFile, JSON.stringify(index), {encoding:'utf8',flag:'w'});
  }
})();
