'use strict';

module.exports = { send };

/**
 * @param {http.ServerResponse} res
 * @param {string} html
 */
function send(res, html) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(html);
    res.end();
}
