import {SnippetOperations} from "./snippetOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {TestCaseResult} from "./queries.tsx";
import {getFetch} from "./api/apiService.ts";
import {FakeSnippetStore} from "./mock/fakeSnippetStore.ts";

export class RealSnippetOperations implements SnippetOperations {
    private readonly token: string;
    private readonly fakeStore = new FakeSnippetStore()

    constructor(fetchToken: string) {
        this.token = fetchToken;
    }

    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return Promise.resolve(undefined);
    }

    deleteSnippet(id: string): Promise<string> {
        return Promise.resolve("");
    }

    formatSnippet(snippet: string): Promise<string> {
        return Promise.resolve("");
    }

    getFileTypes(): Promise<FileType[]> {
        return Promise.resolve([]);
    }

    getFormatRules(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    getLintingRules(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return Promise.resolve(undefined);
    }

    getTestCases(): Promise<TestCase[]> {
        return Promise.resolve([]);
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return Promise.resolve(undefined);
    }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        console.log("IM ON THIS METHOD");
        console.log("Token: ", this.token);
        getFetch(`/test/parser/communication`, this.token).then(async(response) => {console.log("Response: ", await response.json())});
        const response: PaginatedSnippets = {
            page: page,
            page_size: pageSize,
            count: 20,
            snippets: page == 0 ? this.fakeStore.listSnippetDescriptors().splice(0,pageSize) : this.fakeStore.listSnippetDescriptors().splice(1,2)
        }
        return Promise.resolve(response);
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return Promise.resolve(undefined);
    }

    removeTestCase(id: string): Promise<string> {
        return Promise.resolve("");
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return Promise.resolve(undefined);
    }

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return Promise.resolve(undefined);
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return Promise.resolve(undefined);
    }

}