'use strict';

const fs = require('fs');
const http2 = require('http2');
const express = require('express');
const nunjucks = require('nunjucks');

// Dirty hack until Express supports http2.
// See: https://github.com/expressjs/express/issues/2761
express.request.__proto__ = http2.IncomingMessage.prototype;
express.response.__proto__ = http2.ServerResponse.prototype;


/**
 * Generic util functions
 */
const read = file => fs.readFileSync(`${__dirname}/${file}`, { encoding: 'utf8' }).toString();


/**
 * Config
 */
const serverPort = 8443;
const serverOptions = { key: read('cert/key.pem'), cert: read('cert/cert.pem') };
const baseViewBag = {
    loadCSScore: read('src/static/js/loadCSS.min.js'),
    loadCSSrelPreload: read('src/static/js/cssrelpreload.min.js')
};


/**
 * HTTP/2 Server
 */
const app = express();
app.disable('x-powered-by');
app.disable('etag');
app.set('view engine', 'nunjucks');
nunjucks.configure(`${__dirname}/src/`, { autoescape: true, express: app });
app.use('/static', express.static(`${__dirname}/src`));

app.get('/', (req, res) => {

    const viewBag = Object.assign({}, baseViewBag, {
        criticalCSS: read('src/homepage/critical.css')
    });

    if (req.httpVersion === '2.0') {
        const push = res.push('/static/homepage/critical.css');
        push.writeHead(200);
        fs.createReadStream(`${__dirname}/src/homepage/critical.css`).pipe(push);
        viewBag.http2 = true;
    }

    res.render('homepage/homepage', viewBag);

});

http2.createServer(serverOptions, app)
    .listen(serverPort)
    .on('listening', () => console.log(`HTTP/2 server listening on ${serverPort}`));
