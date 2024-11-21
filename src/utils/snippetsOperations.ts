import {ISnippetsOperations} from "./ISnippetsOperations.ts";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, noContentSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "./snippet.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase, TestState} from "../types/TestCase.ts";
import {PaginatedUsers} from "./users.ts";
import {useApiService} from "./api/apiService.ts";
import {adaptSnippet, adaptSnippetsList, adaptUsers} from "./adapter/Adapter.ts";
import {
    adaptFormatRules,
    adaptLintRules,
    createUpdateFormatRulesRequest,
    createUpdateLintRulesRequest
} from "./adapter/RulesAdapter.ts";

export class SnippetsOperations implements ISnippetsOperations {
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

    async formatSnippet(snippetId: string): Promise<string> {
        const response = await this.apiService.postFetch(`/permissions/formatting/run/${snippetId}`, {})
        return response.formatResult.formattedCode;
    }

    getFileTypes(): FileType[] {
        return  [
            {
            language: "printscript",
            extension: "prs",
            },
            {
                language: "python",
                extension: "py",
            },
            {
                language: "java",
                extension: "java",
            },
            {
                language: 'golang',
                extension: 'go'
            }]
    }

    async getFormatRules(): Promise<Rule[]> {
        const response = await this.apiService.getFetch("/permissions/formatting/rules");
        return adaptFormatRules(response.config);
    }

    async getLintingRules(): Promise<Rule[]> {
        const response = await this.apiService.getFetch("/permissions/linting/rules");
        return adaptLintRules(response.config);
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

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await this.apiService.postFetch("/permissions/formatting/update/rules", createUpdateFormatRulesRequest(newRules));
        console.log(response);
        return newRules;
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await this.apiService.postFetch("/permissions/linting/update/rules", createUpdateLintRulesRequest(newRules));
        console.log(response);
        return newRules;
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
        const response = await this.apiService.deleteFetch(`/snippets/testCase/delete/${testId}/for/${snippetId}`);
        return response.message;
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const response = await this.apiService.postFetch("/permissions/reader/share", {
            snippetId,
            targetUserId: userId
        });
        return adaptSnippet(response.snippet);
    }

    async testSnippet(testCase: Partial<TestCase>, snippetId: string): Promise<TestState> {
        const response = await this.apiService.postFetch(`/snippets/snippets/runTest/${snippetId}`, {
            testId: testCase.testId,
            inputs: testCase.inputs,
            outputs: testCase.outputs,
        });
        return response.testState;
    }

    async updateSnippetById(id: string, snippet: UpdateSnippet): Promise<Snippet> {
        const response = await this.apiService.putFetch("/snippets/snippets/update/" + id, snippet);
        return adaptSnippet(response.snippet);
    }
}