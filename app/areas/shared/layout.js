'use strict';

const read = require('../../lib/read');

module.exports = {
    baseViewData: {
        loadCSScore: read('./app/static/js/loadCSS.min.js'),
        loadCSSrelPreload: read('./app/static/js/cssrelpreload.min.js')
    }
};
