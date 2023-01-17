"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseElse = exports.Case = exports.Switch = void 0;
const react_1 = __importStar(require("react"));
const SwitchContext = react_1.default.createContext(undefined);
const ensureArray = (ar) => Array.isArray(ar) ? ar : [ar].filter((f) => f !== undefined);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };
function Switch({ value, children, }) {
    const [switchContext] = (0, react_1.useState)({ cases: {}, value });
    switchContext.value = value;
    return (<SwitchContext.Provider value={switchContext}>
      {children}
    </SwitchContext.Provider>);
}
exports.Switch = Switch;
function Case({ when, children, execute = noop, }) {
    const toCheck = ensureArray(when);
    const { value, cases } = (0, react_1.useContext)(SwitchContext);
    const condition = toCheck.some((when) => {
        if (typeof when === "function") {
            return when(value);
        }
        else {
            return when === value;
        }
    });
    cases[`${when}`] = condition;
    if (condition) {
        execute();
        return <>{children}</>;
    }
    else {
        return null;
    }
}
exports.Case = Case;
function CaseElse({ children }) {
    const { cases } = (0, react_1.useContext)(SwitchContext);
    if (!Object.values(cases).some((v) => !!v)) {
        return <>{children}</>;
    }
    return null;
}
exports.CaseElse = CaseElse;
