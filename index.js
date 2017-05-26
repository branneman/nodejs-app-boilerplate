'use strict';

const fs = require('fs');
const http2 = require('http2');
const express = require('express');

// Dirty hack until Express supports http2.
// See: https://github.com/expressjs/express/issues/2761
express.request.__proto__ = http2.IncomingMessage.prototype;
express.response.__proto__ = http2.ServerResponse.prototype;


/**
 * Generic util functions
 */
const read = f => fs.readFileSync(`${__dirname}/${f}`, { encoding: 'utf8' }).toString();
const render = (tplStr, viewBagTuples) =>
    viewBagTuples.reduce(
        (prev, [key, val]) => prev.replace(`{{ ${key} }}`, val),
        tplStr
    );


/**
 * Config
 */
const serverPort = 8443;
const serverOptions = { key: read('cert/key.pem'), cert: read('cert/cert.pem') };
const baseViewBag = [
    ['loadCSScore', read('src/static/js/loadCSS.min.js')],
    ['loadCSSrelPreload', read('src/static/js/cssrelpreload.min.js')]
];


/**
 * HTTP/2 Server
 */
const app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use('/static', express.static(`${__dirname}/src`));

app.get('/', (req, res) => {

    // HTTP/2 response with Critical CSS via server push
    if (req.httpVersion === '2.0') {

        const push = res.push('/static/homepage/critical.css');
        push.writeHead(200);
        fs.createReadStream(`${__dirname}/src/homepage/critical.css`).pipe(push);

        return res.send(render(read(`src/homepage/http2.html`), baseViewBag));

    }

    // HTTP/1 response with Critical CSS inlined
    const viewBag = baseViewBag.concat(['criticalCSS', read('src/homepage/critical.css')]);
    res.send(render(read(`src/homepage/http1.html`), viewBag));

});

http2.createServer(serverOptions, app)
    .listen(serverPort)
    .on('listening', () => console.log(`HTTP/2 server listening on ${serverPort}`));
