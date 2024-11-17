import {Pagination} from "./pagination.ts";
import {FileType} from "../types/FileType.ts";

export type ComplianceEnum =
    'pending' |
    'failed' |
    'not-compliant' |
    'compliant'


export type CreateSnippet = {
  name: string;
  content: string;
  language: string;
  extension: string;
}

export type CreateSnippetWithLang = CreateSnippet & { language: string }

export type UpdateSnippet = {
  content: string
}

export type Snippet = CreateSnippet & {
  id: string
} & SnippetStatus

export type noContentSnippet = SnippetStatus & {
  id: string,
  name: string;
  language: string;
  extension: string;
}

type SnippetStatus = {
  compliance: ComplianceEnum;
  author: string;
}

export type PaginatedSnippets = Pagination & {
  snippets: noContentSnippet[];
}

export const getFileLanguage = (fileTypes: FileType[], fileExt?: string) => {
  return fileExt && fileTypes?.find(x => x.extension == fileExt)
}