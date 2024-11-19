import {Rule} from "../../types/Rule.ts";

type backLintRules = {
    "writingConventionName"?: string,
    "printLnAcceptsExpressions"?: boolean,
    "readInputAcceptsExpressions"?: boolean
}

type backFormatRules = {
    "spaceBeforeColon"?: boolean,
    "spaceAfterColon"?: boolean,
    "equalSpaces"?: boolean,
    "printLineBreaks"?: number,
    "indentSize"?: number
}

type backUpdateRequest<T> = {
    rules: T
}

export const adaptFormatRules = (rules: backFormatRules): Rule[] => {
    return [{
        name: "spaceBeforeColon",
        isActive: !!rules.spaceBeforeColon,
    }, {
        name: "spaceAfterColon",
        isActive: !!rules.spaceAfterColon,
    }, {
        name: "equalSpaces",
        isActive: !!rules.equalSpaces,
    }, {
        name: "printLineBreaks",
        isActive: !!rules.printLineBreaks,
        value: rules.printLineBreaks || 0
    }, {
        name: "indentSize",
        isActive: !!rules.indentSize,
        value: rules.indentSize || 0
    }]
}

export const createUpdateFormatRulesRequest = (rules: Rule[]): backUpdateRequest<backFormatRules> => {
    return {
        rules: {
            spaceBeforeColon: rules.find(r => r.name === "spaceBeforeColon")?.isActive,
            spaceAfterColon: rules.find(r => r.name === "spaceAfterColon")?.isActive,
            equalSpaces: rules.find(r => r.name === "equalSpaces")?.isActive,
            printLineBreaks: Number(rules.find(r => r.name === "printLineBreaks")?.value),
            indentSize: Number(rules.find(r => r.name === "indentSize")?.value)
        }
    }
}

export const adaptLintRules = (rules: backLintRules): Rule[] => {
    return [{
        name: "writingConventionName",
        isActive: !!rules.writingConventionName,
        value: rules.writingConventionName || "camelCase"
    }, {
        name: "printLnAcceptsExpressions",
        isActive: !!rules.printLnAcceptsExpressions,
    }, {
        name: "readInputAcceptsExpressions",
        isActive: !!rules.readInputAcceptsExpressions,
    }]
}

export const createUpdateLintRulesRequest = (rules: Rule[]): backUpdateRequest<backLintRules> => {
    return {
        rules: {
            writingConventionName: String(rules.find(r => r.name === "writingConventionName")?.value),
            printLnAcceptsExpressions: rules.find(r => r.name === "printLnAcceptsExpressions")?.isActive,
            readInputAcceptsExpressions: rules.find(r => r.name === "readInputAcceptsExpressions")?.isActive
        }
    }
}
