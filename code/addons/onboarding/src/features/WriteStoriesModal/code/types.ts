export type CodeSnippets = {
  framework?: string;
  language: "javascript" | "typescript";
  filename: string;
  code: { snippet: string; toggle?: boolean }[][];
};
