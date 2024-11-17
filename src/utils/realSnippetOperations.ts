import {SnippetOperations} from "./snippetOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, noContentSnippet, PaginatedSnippets, Snippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {TestCaseResult} from "./queries.tsx";
import {useApiService} from "./api/apiService.ts";
import {adaptSnippet, adaptSnippetsList} from "./adapter/Adapter.ts";

export class RealSnippetOperations implements SnippetOperations {
    private readonly apiService = useApiService();

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const snippet = {
            version: "1.1",
            ...createSnippet
        }
        try {
            const response = await this.apiService.postFetch("/snippets/snippets/create", snippet);
            const responseSnippet = response.snippet;
            return Promise.resolve({
                id: responseSnippet.snippetId,
                name: responseSnippet.name,
                content: responseSnippet.content,
                language: responseSnippet.language.langName,
                author: responseSnippet.owner,
                // TODO: Retrieve the extension and compliance from the backend
                extension: "printscript",
                compliance: "pending"
            });
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

    getUserFriends(): Promise<PaginatedUsers> {
        return Promise.resolve({page: 0, users: [{id: "", name: ""}], page_size: 0, count: 0});
    }

    async listSnippetDescriptors(page: number, pageSize: number): Promise<PaginatedSnippets> {
        try {
            const response = await this.apiService.getFetch("/snippets/snippets/getAll");
            const snippets: noContentSnippet[] = adaptSnippetsList(response.snippetsList);
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

    shareSnippet(): Promise<Snippet> {
        return Promise.resolve({id: "", name: "", author: "", content: "", extension: "", language: "", compliance: "pending"});
    }

    testSnippet(): Promise<TestCaseResult> {
        return Promise.resolve("fail");
    }

    updateSnippetById(): Promise<Snippet> {
        return Promise.resolve({id: "", name: "", author: "", content: "", extension: "", language: "", compliance: "pending"});
    }
}