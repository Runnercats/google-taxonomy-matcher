"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taxonomies = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Taxonomies {}
exports.Taxonomies = Taxonomies;
class parser {
  constructor(locale) {
    this.taxonomy = "taxonomy-with-ids." + locale + ".txt";
    this.files = fs.readdirSync(path.join(__dirname, "../taxonomies"));
    this.taxonomyparsed = [];
    if (this.files.indexOf(this.taxonomy))
      throw new Error("Invalid Locale " + locale);
    else {
      let lines = fs
        .readFileSync(
          path.join(__dirname, "../taxonomies", this.taxonomy),
          "utf8"
        )
        .toString()
        .split("\n");
      this.taxonomyparsed = lines.reduce((result, line) => {
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
exports.default = parser;
