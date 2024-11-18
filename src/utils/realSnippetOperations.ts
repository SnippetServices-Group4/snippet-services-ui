import {SnippetOperations} from "./snippetOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, noContentSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {TestCaseResult} from "./queries.tsx";
import {useApiService} from "./api/apiService.ts";
import {adaptSnippet, adaptSnippetsList, adaptUsers} from "./adapter/Adapter.ts";

export class RealSnippetOperations implements SnippetOperations {
    private readonly apiService = useApiService();

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const snippet = {
            version: "1.1",
            ...createSnippet
        }
        try {
            const response = await this.apiService.postFetch("/snippets/snippets/create", snippet);
            return adaptSnippet(response.snippet);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteSnippet(id: string): Promise<string> {
        try {
            const response = await this.apiService.deleteFetch("/snippets/snippets/delete/" + id);
            return response.message;
        }
        catch (error) {
            return Promise.reject(error);
        }
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
        try {
            const response = await this.apiService.getFetch("/snippets/snippets/get/" + id);
            return adaptSnippet(response.snippet);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    getTestCases(): Promise<TestCase[]> {
        return Promise.resolve([]);
    }

    async getUserFriends(name?: string, page: number = 0, pageSize: number = 0): Promise<PaginatedUsers> {
        try {
            const response = await this.apiService.getFetch("/permissions/user/getAll");
            const users = adaptUsers(response.users);
            return Promise.resolve({page: page, users, page_size: pageSize, count: 0});
        }
        catch (error) {
            return Promise.reject({error, name});
        }
    }

    async listSnippetDescriptors(page: number, pageSize: number): Promise<PaginatedSnippets> {
        try {
            const response = await this.apiService.getFetch("/snippets/snippets/getAll");
            const snippets: noContentSnippet[] = adaptSnippetsList(response.snippetList);
            return Promise.resolve({snippets, page, count: 20, page_size: pageSize});
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    modifyFormatRule(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    modifyLintingRule(): Promise<Rule[]> {
        return Promise.resolve([]);
    }

    postTestCase(): Promise<TestCase> {
        return Promise.resolve({id: "", name: ""});
    }

    removeTestCase(): Promise<string> {
        return Promise.resolve("");
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        try {
            const response = await this.apiService.postFetch("/permissions/reader/share", {
                snippetId,
                targetUserId: userId
            });
            return adaptSnippet(response.snippet);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    testSnippet(): Promise<TestCaseResult> {
        return Promise.resolve("fail");
    }

    async updateSnippetById(id: string, snippet: UpdateSnippet): Promise<Snippet> {
        try {
            const response = await this.apiService.putFetch("/snippets/snippets/update/" + id, snippet);
            return adaptSnippet(response.snippet);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}