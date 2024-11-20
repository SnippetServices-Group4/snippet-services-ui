import {ComplianceEnum, noContentSnippet, Snippet} from "../snippet.ts";
import {User} from "../users.ts";

export type backSnippet = {
    "snippetId": string,
    "name": string,
    "owner": string,
    "language": {
        "langName": string,
        "version": string,
        "extension": string
    }
    content: string,
    "status": string
}

export type backListedSnippets = {
    "snippetId": string,
    "name": string,
    "owner": string,
    "language": {
        "langName": string,
        "version": string,
        "extension": string
    },
    "status": string
}[]

export const adaptSnippet = (snippet: backSnippet): Snippet => {
    return {
        id: snippet.snippetId,
        author: snippet.owner,
        name: snippet.name,
        language: snippet.language.langName,
        content: snippet.content,
        extension: snippet.language.extension,
    }
}

export const adaptSnippetsList = (snippets: backListedSnippets): noContentSnippet[] => {
    return snippets.map((snippet) => ({
        id: snippet.snippetId,
        name: snippet.name,
        author: snippet.owner,
        language: snippet.language.langName,
        extension: snippet.language.extension,
        compliance: snippet.status as ComplianceEnum
    }));
}

export type user = {
    userId: string,
    username: string
}

export const adaptUsers = (users: user[]): User[] => {
    return users.map((user) => ({
        id: user.userId,
        name: user.username
    }));
}