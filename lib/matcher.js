"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const taxonomy_parser_1 = __importDefault(require("./taxonomy_parser"));
const minisearch_1 = __importDefault(require("minisearch"));
class Matcher {
  constructor(locale, threshold) {
    this.taxonomy = new taxonomy_parser_1.default(locale);
    this.threshold = threshold;
    this.miniSearch = new minisearch_1.default({
      fields: ["category", "full_path_scrubbed"],
      storeFields: ["id", "full_path"],
    });
    this.miniSearch.addAll(this.taxonomy.read());
  }
  match(title, miniSearchOpts = { fuzzy: 0.2, boost: { category: 2 } }) {
    let matched = this.miniSearch.search(title, miniSearchOpts)[0];
    if (!matched || matched.score < this.threshold) return undefined;
    else return matched;
  }
}
exports.default = Matcher;
