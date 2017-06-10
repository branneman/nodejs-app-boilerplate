'use strict';

const fs = require('fs');
const read = require('../../util/read');
const send = require('../../util/http-helpers').send;
const render = require('../../util/render-nunjucks-template');
const layout = require('../shared/layout');

const criticalCSSurl = '/static/css/critical/homepage.css';
const criticalCSS = read(`./app${criticalCSSurl}`);

/**
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {

    const viewData = Object.assign({}, layout.baseViewData, {
        httpVersion: req.httpVersion,
        criticalCSSurl,
        criticalCSS
    });

    if (req.httpVersion === '2.0') {
        const push = res.push(criticalCSSurl);
        push.writeHead(200, {
            'Content-Type': 'text/css; charset=UTF-8',
            'Content-Length': criticalCSS.length
        });
        push.write(criticalCSS);
        push.end();
        viewData.http2 = true;
    }

    send(res, render('homepage/homepage', viewData));

};
