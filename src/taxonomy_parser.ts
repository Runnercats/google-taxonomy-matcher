import * as fs from "fs";
import * as path from "path";

export class Taxonomies {
  id!: number;
  full_path!: string;
  full_path_scrubbed!: string;
  category!: string;
}

export default class parser {
  taxonomy: string;
  files: string[];
  taxonomyparsed: Taxonomies[];
  constructor(locale: string) {
    this.taxonomy = "taxonomy-with-ids." + locale + ".txt";
    this.files = fs.readdirSync(path.join(__dirname, "../taxonomies"));
    this.taxonomyparsed = [];
    if (this.files.indexOf(this.taxonomy) === -1)
      throw new Error("Invalid Locale " + locale);
    else {
      let lines = fs
        .readFileSync(
          path.join(__dirname, "../taxonomies", this.taxonomy),
          "utf8"
        )
        .toString()
        .split("\n");

      this.taxonomyparsed = lines.reduce((result: Taxonomies[], line) => {
        if (line.match(/^[0-9]/)) {
          let split1 = line.split(" - ");
          let split2 = split1[1].split(" > ");
          result.push({
            id: parseInt(split1[0]),
            full_path: split1[1],
            full_path_scrubbed: split1[1].replace(/ [>&,] /g, " "),
            category: split2[split2.length - 1],
          });
          return result;
        } else return result;
      }, []);
    }
  }

  read() {
    return this.taxonomyparsed;
  }
}
