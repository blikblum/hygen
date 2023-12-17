"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const localsToCapitalize = ['name'];
const localsToPluralize = ['name'];
const localsDefaults = {
    name: 'unnamed',
};
const processLocals = (hsh, [key, value]) => {
    hsh[key] = value;
    if (localsToCapitalize.includes(key)) {
        hsh[(0, helpers_1.capitalize)(key)] = (0, helpers_1.capitalize)(value);
    }
    if (localsToPluralize.includes(key)) {
        hsh[helpers_1.inflection.pluralize(key)] = helpers_1.inflection.pluralize(value);
        hsh[(0, helpers_1.capitalize)(helpers_1.inflection.pluralize(key))] = (0, helpers_1.capitalize)(helpers_1.inflection.pluralize(value));
    }
    return hsh;
};
const processedLocals = (locals) => Object.entries(locals).reduce(processLocals, {});
const context = (locals, config = {}) => {
    const localsWithDefaults = Object.assign(Object.assign(Object.assign({}, localsDefaults), config.localsDefaults), locals);
    return Object.assign(localsWithDefaults, processedLocals(localsWithDefaults), {
        h: (0, helpers_1.createHelpers)(locals, config),
    });
};
exports.default = context;
