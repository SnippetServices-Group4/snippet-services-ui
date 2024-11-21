import {Rule} from "../../types/Rule.ts";

type backLintRules = {
    "writingConventionName": string | null,
    "printLnAcceptsExpressions": boolean,
    "readInputAcceptsExpressions": boolean
}

type backFormatRules = {
    "spaceBeforeColon": boolean,
    "spaceAfterColon": boolean,
    "equalSpaces": boolean,
    "printLineBreaks": number,
    "indentSize": number
}

type backUpdateRequest<T> = {
    rules: T
}

export const adaptFormatRules = (rules: backFormatRules): Rule[] => {
    return [{
        name: "spaceBeforeColon",
        isActive: rules.spaceBeforeColon,
    }, {
        name: "spaceAfterColon",
        isActive: rules.spaceAfterColon,
    }, {
        name: "equalSpaces",
        isActive: rules.equalSpaces,
    }, {
        name: "printLineBreaks",
        isActive: rules.printLineBreaks !== 0,
        value: rules.printLineBreaks
    }, {
        name: "indentSize",
        isActive: rules.indentSize !== 0,
        value: rules.indentSize
    }]
}

export const createUpdateFormatRulesRequest = (rules: Rule[]): backUpdateRequest<backFormatRules> => {
    function getNumber(ruleName: string) {
        const rule = rules.find(r => r.name === ruleName);
        if (!rule) {
            return 0;
        } else {
            if (rule.isActive) {
                return rule.value;
            } else {
                return 0;
            }
        }
    }

    return {
        rules: {
            spaceBeforeColon: rules.find(r => r.name === "spaceBeforeColon")?.isActive ?? false,
            spaceAfterColon: rules.find(r => r.name === "spaceAfterColon")?.isActive ?? false,
            equalSpaces: rules.find(r => r.name === "equalSpaces")?.isActive ?? false,
            printLineBreaks: Number(getNumber("printLineBreaks")),
            indentSize: Number(getNumber("indentSize"))
        }
    }
}

export const adaptLintRules = (rules: backLintRules): Rule[] => {
    return [{
        name: "writingConventionName",
        isActive: rules.writingConventionName !== null && rules.writingConventionName !== "",
        value: rules.writingConventionName
    }, {
        name: "printLnAcceptsExpressions",
        isActive: rules.printLnAcceptsExpressions,
    }, {
        name: "readInputAcceptsExpressions",
        isActive: rules.readInputAcceptsExpressions,
    }]
}

export const createUpdateLintRulesRequest = (rules: Rule[]): backUpdateRequest<backLintRules> => {
    function getConventionName() {
        const rule = rules.find(r => r.name === "writingConventionName");
        if (!rule) {
            return "";
        } else {
            if (rule.isActive) {
                return rule.value;
            } else {
                return "";
            }
        }
    }

    return {
        rules: {
            writingConventionName: String(getConventionName()),
            printLnAcceptsExpressions: rules.find(r => r.name === "printLnAcceptsExpressions")?.isActive ?? false,
            readInputAcceptsExpressions: rules.find(r => r.name === "readInputAcceptsExpressions")?.isActive ?? false
        }
    }
}
