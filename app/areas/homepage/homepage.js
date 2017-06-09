'use strict';

const fs = require('fs');
const read = require('../../util/read');
const send = require('../../util/http-helpers').send;
const render = require('../../util/render-nunjucks-template');
const layout = require('../shared/layout');

/**
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {

    const viewData = Object.assign({}, layout.baseViewData, {
        httpVersion: req.httpVersion,
        criticalCSSurl: '/app/areas/homepage/critical.css',
        criticalCSS: read('./app/areas/homepage/critical.css')
    });

    if (req.httpVersion === '2.0') {
        const push = res.push('/static/css/homepage-critical.css');
        push.writeHead(200);
        fs.createReadStream('./app/areas/homepage/critical.css').pipe(push);
        viewData.http2 = true;
    }

    send(res, render('homepage/homepage', viewData));

};
