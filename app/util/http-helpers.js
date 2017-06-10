'use strict';

module.exports = { send };

/**
 * @param {http.ServerResponse} res
 * @param {string} html
 */
function send(res, html) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': html.length
    });
    res.write(html);
    res.end();
}
