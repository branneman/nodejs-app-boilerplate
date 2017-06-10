'use strict';

const url = require('url');
const send = require('send');
const homepage = require('./areas/homepage/homepage');

/**
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {

    // Statics
    const path = url.parse(req.url).pathname;
    if (path.startsWith('/static/')) {
        return send(req, path, {
            root: './app/',
            acceptRanges: false,
            etag: false,
            cacheControl: false,
            lastModified: false
        }).pipe(res);
    }

    // HTML
    homepage(req, res);

};
