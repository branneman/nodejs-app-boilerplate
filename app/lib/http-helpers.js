'use strict';

const mime = require('mime');

module.exports = {
    sendHTML,
    push
};

/**
 * @param {http.ServerResponse} res
 * @param {string} html
 */
function sendHTML(res, html) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': html.length
    });
    res.write(html);
    res.end();
}

/**
 * @param {http.ServerResponse} res
 * @param {string} fileName
 * @param {string} fileContents
 */
function push(res, fileName, fileContents) {
    if (!res.push) return;
    const push = res.push(fileName);
    push.writeHead(200, {
        'Content-Type': `${mime.lookup(fileName)}; charset=UTF-8`,
        'Content-Length': fileContents.length
    });
    push.write(fileContents);
    push.end();
}
