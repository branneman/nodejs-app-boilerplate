'use strict';

const serveStatic = require('serve-static');
const homepage = require('./areas/homepage/homepage');

/**
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {

    // Statics
    serveStatic('./app', {
        acceptRanges: false,
        etag: false,
        cacheControl: false,
        lastModified: false
    })(req, res, next);

    // HTML
    function next() {
        homepage(req, res);
    }

};
