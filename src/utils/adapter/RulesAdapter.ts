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

export const adaptLintRules = (rules: backLintRules): Rule[] => {
    console.log("back rules: ", rules)

    const adaptedRules = [{
        name: "writingConventionName",
        isActive: !!rules.writingConventionName,
        value: rules.writingConventionName || "camelCase"
    }, {
        name: "printLnAcceptsExpressions",
        isActive: !!rules.printLnAcceptsExpressions,
    }, {
        name: "readInputAcceptsExpressions",
        isActive: !!rules.readInputAcceptsExpressions,
    }];

    console.log("adapted rules: ", adaptedRules)

    return adaptedRules
}
