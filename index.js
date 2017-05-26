'use strict';

const fs = require('fs');
const express = require('express');

/**
 * Generic functions
 */
const read = f => fs.readFileSync(`${__dirname}/${f}`, { encoding: 'utf8' }).toString();
const render = (tplStr, viewBagTuples) =>
    viewBagTuples.reduce(
        (prev, [key, val]) => prev.replace(new RegExp(`\{\{\s*${key}\s*\}\}`, 'i'), val),
        tplStr
    );

/**
 * Config
 */
const serverPort = 8080;
const serverOptions = { key: read('cert/key.pem'), cert: read('cert/cert.pem') };
const baseViewBag = [
    ['loadCSScore', read('src/static/js/loadCSS.min.js')],
    ['loadCSSrelPreload', read('src/static/js/cssrelpreload.min.js')]
];

/**
 * HTTP/1 Server
 */
const appHTTP1 = express();
appHTTP1.use((req, res) => {
    console.log('GET / HTTP/1');
    res.redirect(301, `https://localhost:${serverPort}${req.path}`);
});
require('http')
    .createServer(serverOptions, appHTTP1)
    .listen(serverPort, () => console.log('HTTP/1 server listening'));

/**
 * HTTP/1+SSL Server
 */
const appHTTP1ssl = express();

appHTTP1ssl.get('/', (req, res) => {
    console.log('GET / HTTP/1+SSL');

    const viewBag = baseViewBag.concat([
        ['criticalCSS', read('src/homepage/critical.css')]
    ]);
    res.send(render(read('src/homepage/http1.html'), viewBag));

});

require('https')
    .createServer(serverOptions, appHTTP1ssl)
    .listen(serverPort, () => console.log('HTTP/1+SSL server listening'));

/**
 * HTTP/2 Server
 */
const appHttp2 = express();

appHttp2.get('/', (req, res) => {
    console.log('GET / HTTP/2');

    res.push(read('src/homepage/remaining.css'), {
        url: 'src/homepage/remaining.css'
    });

    res.send(render(read('src/homepage/http2.html'), baseViewBag));

});

require('http2')
    .createServer(serverOptions, appHttp2)
    .listen(serverPort, () => console.log('HTTP/2 server listening'));
