import taxonomy_parser from "./taxonomy_parser";
import MiniSearch, { SearchResult } from "minisearch";

class Matcher {
  taxonomy: any;
  threshold: number;
  miniSearch: MiniSearch;
  constructor(locale: string, threshold: number) {
    this.taxonomy = new taxonomy_parser(locale);
    this.threshold = threshold;
    this.miniSearch = new MiniSearch({
      fields: ["category", "full_path_scrubbed"],
      storeFields: ["id", "full_path"],
    });

    this.miniSearch.addAll(this.taxonomy.read());
  }

  match(
    title: any,
    miniSearchOpts = { fuzzy: 0.2, boost: { category: 2 } }
  ): SearchResult[] {
    let matched = this.miniSearch.search(title, miniSearchOpts);
    return matched.filter((match) => match.score > this.threshold);
  }
}

export default Matcher;
