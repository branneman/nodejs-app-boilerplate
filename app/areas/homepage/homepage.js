'use strict';

const read = require('../../lib/read');
const { sendHTML, push } = require('../../lib/http-helpers');
const render = require('../../lib/render-nunjucks-template');
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

    push(res, criticalCSSurl, criticalCSS);
    sendHTML(res, render('homepage/homepage', viewData));

};
