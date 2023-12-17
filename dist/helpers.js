"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inflection = exports.createHelpers = exports.capitalize = void 0;
const path_1 = __importDefault(require("path"));
const inflection_1 = __importDefault(require("inflection"));
exports.inflection = inflection_1.default;
const change_case_1 = __importDefault(require("change-case"));
// supports kebab-case to KebabCase
inflection_1.default.undasherize = (str) => str
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
const capitalize = (str) => {
    const toBeCapitalized = String(str);
    return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1);
};
exports.capitalize = capitalize;
const globalHelpers = {
    capitalize,
    inflection: inflection_1.default,
    changeCase: change_case_1.default,
    path: path_1.default,
};
const createHelpers = (locals, config) => {
    const configHelpers = (config &&
        (typeof config.helpers === 'function'
            ? config.helpers(locals, config)
            : config.helpers)) ||
        {};
    return Object.assign(Object.assign({}, globalHelpers), configHelpers);
};
exports.createHelpers = createHelpers;
