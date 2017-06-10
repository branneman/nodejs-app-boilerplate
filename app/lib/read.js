'use strict';

const readFile = require('fs').readFileSync;

module.exports = read;

/**
 * @param {string} file
 * @returns {string}
 */
function read(file) {
    return readFile(file, 'utf8').toString();
}
