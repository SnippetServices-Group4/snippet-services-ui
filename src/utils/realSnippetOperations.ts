import {SnippetOperations} from "./snippetOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, noContentSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase, TestState} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {useApiService} from "./api/apiService.ts";
import {adaptSnippet, adaptSnippetsList, adaptUsers} from "./adapter/Adapter.ts";

export class RealSnippetOperations implements SnippetOperations {
    private readonly apiService = useApiService();

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const snippet = {
            version: "1.1",
            ...createSnippet
        };
        const response = await this.apiService.postFetch("/snippets/snippets/create", snippet);
        return adaptSnippet(response.snippet);
    }

    async deleteSnippet(id: string): Promise<string> {
        const response = await this.apiService.deleteFetch("/snippets/snippets/delete/" + id);
        return response.message;
    }

    formatSnippet(): Promise<string> {
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

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await this.apiService.getFetch("/snippets/snippets/get/" + id);
        return adaptSnippet(response.snippet);
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const response = await this.apiService.getFetch("/snippets/testCase/getAll/" + snippetId);
        return Promise.resolve(response.testCases);
    }

    async getUserFriends(page: number = 0, pageSize: number = 0): Promise<PaginatedUsers> {
        const response = await this.apiService.getFetch("/permissions/user/getAll");
        const users = adaptUsers(response.users);
        return Promise.resolve({page: page, users, page_size: pageSize, count: 0});
    }

    async listSnippetDescriptors(page: number, pageSize: number): Promise<PaginatedSnippets> {
        const response = await this.apiService.getFetch("/snippets/snippets/getAll");
        const snippets: noContentSnippet[] = adaptSnippetsList(response.snippetList);
        return Promise.resolve({snippets, page, count: 20, page_size: pageSize});
    }

    modifyFormatRule(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    modifyLintingRule(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    async postTestCase(testCase: Partial<TestCase>, snippetId: string): Promise<TestCase> {
        const isUpdate: boolean = !!testCase.testId;
        const test = {
            name: testCase.name,
            inputs: testCase.inputs ?? [],
            outputs: testCase.outputs ?? []
        }
        // Updating or creating the test case based on the presence of testId
        const response = await (isUpdate ?
            this.apiService.putFetch(`/snippets/testCase/update/${testCase.testId}/for/${snippetId}`, test) :
            this.apiService.postFetch(`/snippets/testCase/createFor/${snippetId}`, test));
        return response.testCase;
    }

    async removeTestCase(testId: string, snippetId: string): Promise<string> {
        const response = await this.apiService.deleteFetch(`/snippets/testCase/update/${testId}/for/${snippetId}`);
        return response.message;
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const response = await this.apiService.postFetch("/permissions/reader/share", {
            snippetId,
            targetUserId: userId
        });
        return adaptSnippet(response.snippet);
    }

    testSnippet(): Promise<TestState> {
        return Promise.resolve("FAILED");
    }

    async updateSnippetById(id: string, snippet: UpdateSnippet): Promise<Snippet> {
        const response = await this.apiService.putFetch("/snippets/snippets/update/" + id, snippet);
        return adaptSnippet(response.snippet);
    }
}