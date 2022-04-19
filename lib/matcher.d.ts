import MiniSearch, { SearchResult } from "minisearch";
declare class Matcher {
  taxonomy: any;
  threshold: number;
  miniSearch: MiniSearch;
  constructor(locale: string, threshold: number);
  match(
    title: any,
    miniSearchOpts?: {
      fuzzy: number;
      boost: {
        category: number;
      };
    }
  ): SearchResult[];
}
export default Matcher;
