export type TestCase = {
    testId: string;
    name: string;
    inputs?: string[];
    outputs?: string[];
    state: TestState;
};

export type TestState = "PASSED" | "FAILED" | "RUNNING" | "NOT_STARTED";