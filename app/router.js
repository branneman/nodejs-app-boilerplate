'use strict';

const fs = require('fs');
const homepage = require('./areas/homepage/homepage');

/**
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {

    // Statics: critical.css
    if (req.url.substr(0, 11) === '/app/areas/' && req.url.substr(-13) === '/critical.css') {
        return fs.createReadStream(`.${req.url}`).pipe(res);
    }

    // Statics
    if (req.url.substr(0, 7) === '/static') {
        return fs.createReadStream(`./app${req.url}`).pipe(res);
    }

    // HTML
    if (req.url === '/') {
        return homepage(req, res);
    }

};
