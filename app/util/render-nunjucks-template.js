'use strict';

const nunjucks = require('nunjucks');

module.exports = render;

/**
 * @param {string} file
 * @param {{}} [viewData={}]
 * @returns {string}
 */
function render(file, viewData = {}) {
    return nunjucks.render(`${file}.njk`, viewData);
}
