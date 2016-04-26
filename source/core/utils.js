/** @file General util functions */

const _ = require('lodash');

/**
 * Takes a function as a parameter and use the unbound this as
 * its first parameter
 *
 * @memberof {module:core.utils}
 *
 * @param {Function} f The funcion to lift
 *
 * @return {Function} The lifted function
 */
const methodify = f => function () {
    return f.apply(null, [].concat.apply([this], arguments));
};

/**
 * Takes an object association method names to functions
 * and methodifies all methods
 *
 * @memberof {module:core.utils}
 *
 * @param {Object<String, Function>} f The funcions index by name
 *
 * @return {Object<String, Function>} Names associated to methodified functions
 */
const methodifyAll = methodsByName => {
    const methodsNames = Object.keys(methodsByName);

    return _.zipObject(methodsNames, methodsNames.map(name => methodify(
        methodsByName[name]
    )));
};

/**
 * Utils functions
 *
 * @memberof {module:core}
 *
 * @namespace
 * @name      utils
 */
module.exports = { methodify, methodifyAll };
