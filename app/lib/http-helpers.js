'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = ['mime'];

function factory(mime) {
    return {

        /**
         * @param {http.ServerResponse} res
         * @param {number} statusCode
         * @param {string} html
         */
        sendHTML(res, statusCode, html) {
            res.writeHead(statusCode, {
                'Content-Type': 'text/html; charset=UTF-8',
                'Content-Length': html.length
            });
            res.write(html);
            res.end();
        },

        /**
         * @param {http.ServerResponse} res
         * @param {string} fileName
         * @param {string} fileContents
         */
        push(res, fileName, fileContents) {
            if (!res.push) return;
            const push = res.push(fileName);
            push.writeHead(200, {
                'Content-Type': `${mime.lookup(fileName)}; charset=UTF-8`,
                'Content-Length': fileContents.length
            });
            push.write(fileContents);
            push.end();
        }

    };
}
