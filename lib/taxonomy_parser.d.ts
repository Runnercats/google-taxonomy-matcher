export declare class Taxonomies {
  id: number;
  full_path: string;
  full_path_scrubbed: string;
  category: string;
}
export default class parser {
  taxonomy: string;
  files: string[];
  taxonomyparsed: Taxonomies[];
  constructor(locale: string);
  read(): Taxonomies[];
}
