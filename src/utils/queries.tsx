import { useMutation, UseMutationResult, useQuery } from 'react-query';
import { CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet } from './snippet.ts';
import { PaginatedUsers } from './users.ts';
import { TestCase, TestState } from '../types/TestCase.ts';
import { FileType } from '../types/FileType.ts';
import { Rule } from '../types/Rule.ts';
import { SnippetsOperations } from './snippetsOperations.ts';

export const useSnippetOperations = () => {
  return new SnippetsOperations();
};

export const useGetSnippets = (page: number = 0, pageSize: number = 10, snippetName?: string) => {
  const snippetOperations = useSnippetOperations();
  return useQuery<PaginatedSnippets, Error>(
      ['listSnippets', page, pageSize, snippetName],
      async () => await snippetOperations.listSnippetDescriptors(page, pageSize)
  );
};

export const useGetSnippetById = (id: string) => {
  const snippetOperations = useSnippetOperations();
  return useQuery<Snippet | undefined, Error>(
      ['snippet', id],
      async () => await snippetOperations.getSnippetById(id),
      { enabled: !!id }
  );
};

export const useCreateSnippet = ({ onSuccess }: { onSuccess: () => void }): UseMutationResult<Snippet, Error, CreateSnippet> => {
  const snippetOperations = useSnippetOperations();
  return useMutation<Snippet, Error, CreateSnippet>(
      async (createSnippet) => await snippetOperations.createSnippet(createSnippet),
      { onSuccess }
  );
};

export const useUpdateSnippetById = ({ onSuccess }: { onSuccess: () => void }): UseMutationResult<Snippet, Error, { id: string; updateSnippet: UpdateSnippet }> => {
  const snippetOperations = useSnippetOperations();
  return useMutation<Snippet, Error, { id: string; updateSnippet: UpdateSnippet }>(
      async ({ id, updateSnippet }) => await snippetOperations.updateSnippetById(id, updateSnippet),
      { onSuccess }
  );
};

export const useGetUsers = (name: string = '', page: number = 0, pageSize: number = 10) => {
  const snippetOperations = useSnippetOperations();
  return useQuery<PaginatedUsers, Error>(
      ['users', name, page, pageSize],
      async () => await snippetOperations.getUserFriends(page, pageSize)
  );
};

export const useShareSnippet = () => {
  const snippetOperations = useSnippetOperations();
  return useMutation<Snippet, Error, { snippetId: string; userId: string }>(
      async ({ snippetId, userId }) => await snippetOperations.shareSnippet(snippetId, userId)
  );
};

export const useGetTestCases = (snippetId: string) => {
  const snippetOperations = useSnippetOperations();
  return useQuery<TestCase[] | undefined, Error>(
      ['testCases', snippetId],
      async () => await snippetOperations.getTestCases(snippetId),
      { enabled: !!snippetId }
  );
};

export const usePostTestCase = () => {
  const snippetOperations = useSnippetOperations();
  return useMutation<TestCase, Error, { testCase: Partial<TestCase>; snippetId: string }>(
      async ({ testCase, snippetId }) => await snippetOperations.postTestCase(testCase, snippetId)
  );
};

export const useRemoveTestCase = ({ onSuccess }: { onSuccess: () => void }) => {
  const snippetOperations = useSnippetOperations();
  return useMutation<string, Error, { id: string; snippetId: string }>(
      async ({ id, snippetId }) => await snippetOperations.removeTestCase(id, snippetId),
      { onSuccess }
  );
};

export const useTestSnippet = () => {
  const snippetOperations = useSnippetOperations();
  return useMutation<TestState, Error, Partial<TestCase> & { snippetId: string }>(
      async ({ snippetId, ...tc }) => await snippetOperations.testSnippet(tc, snippetId)
  );
};

export const useGetFormatRules = () => {
  const snippetOperations = useSnippetOperations();
  return useQuery<Rule[], Error>(
      'formatRules',
      async () => await snippetOperations.getFormatRules()
  );
};

export const useModifyFormatRules = ({ onSuccess }: { onSuccess: () => void }) => {
  const snippetOperations = useSnippetOperations();
  return useMutation<Rule[], Error, Rule[]>(
      async (rule) => await snippetOperations.modifyFormatRule(rule),
      { onSuccess }
  );
};

export const useGetLintingRules = () => {
  const snippetOperations = useSnippetOperations();
  return useQuery<Rule[], Error>(
      'lintingRules',
      async () => await snippetOperations.getLintingRules()
  );
};

export const useModifyLintingRules = ({ onSuccess }: { onSuccess: () => void }) => {
  const snippetOperations = useSnippetOperations();
  return useMutation<Rule[], Error, Rule[]>(
      async (rule) => await snippetOperations.modifyLintingRule(rule),
      { onSuccess }
  );
};

export const useFormatSnippet = () => {
  const snippetOperations = useSnippetOperations();
  return useMutation<string, Error, string>(
      async (snippetId: string) => await snippetOperations.formatSnippet(snippetId)
  );
};

export const useDeleteSnippet = ({ onSuccess }: { onSuccess: () => void }) => {
  const snippetOperations = useSnippetOperations();
  return useMutation<string, Error, string>(
      async (id) => await snippetOperations.deleteSnippet(id),
      { onSuccess }
  );
};

export const useGetFileTypes = () => {
  const snippetOperations = useSnippetOperations();
  return useQuery<FileType[], Error>(
      'fileTypes',
      async () => snippetOperations.getFileTypes()
  );
};
