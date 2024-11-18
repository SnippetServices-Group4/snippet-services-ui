export type TestCase = {
    testId: string;
    name: string;
    inputs?: string[];
    outputs?: string[];
    state: TestState;
};

export enum TestState {
    PASSED = "PASS",
    FAILED = "FAILED",
    RUNNING = "RUNNING",
    NOT_STARTED = "NOT_STARTED",
}