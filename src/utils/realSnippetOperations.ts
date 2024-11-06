/*
import {SnippetOperations} from "./snippetOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {TestCaseResult} from "./queries.tsx";
import {FakeSnippetStore} from "./mock/fakeSnippetStore.ts";
import {useApiService} from "./api/apiService.ts";

export class RealSnippetOperations implements SnippetOperations {
    private readonly fakeStore = new FakeSnippetStore();
    private readonly apiService = useApiService();  // Call the API service functions from here

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

    listSnippetDescriptors(page: number, pageSize: number, snippetName?: string): Promise<PaginatedSnippets> {
        console.log("IM ON THIS METHOD");
        this.apiService.getFetch(`/test/parser/communication`).then(async(response: any) => {console.log("Response: ", await response.json())});
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
 */