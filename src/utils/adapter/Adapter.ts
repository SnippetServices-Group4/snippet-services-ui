import {noContentSnippet, Snippet} from "../snippet.ts";

export type backSnippet = {
    "snippetId": string,
    "name": string,
    "owner": string,
    "language": {
        "langName": string,
        "version": string
    }
    content: string
}

export type backListedSnippets = {
    "snippetId": string,
    "name": string,
    "owner": string,
    "language": {
        "langName": string,
        "version": string
    }
}[]

export const adaptSnippet = (snippet: backSnippet): Snippet => {
    return {
        id: snippet.snippetId,
        author: snippet.owner,
        name: snippet.name,
        language: snippet.language.langName,
        content: snippet.content,
        // TODO: define these fields in the backend response
        extension: "printscript",
        compliance: "compliant"
    }
}

export const adaptSnippetsList = (snippets: backListedSnippets): noContentSnippet[] => {
    return snippets.map((snippet) => ({
        id: snippet.snippetId,
        name: snippet.name,
        author: snippet.owner,
        language: snippet.language.langName,
        // TODO: define this field in the backend response
        extension: "printscript",
        compliance: "compliant"
    }));
}

