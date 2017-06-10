'use strict';

process.cwd(__dirname);

const http2 = require('http2');
const nunjucks = require('nunjucks');
const pkg = require('./package');
const read = require('./app/util/read');
const router = require('./app/router');

nunjucks
    .configure('./app/areas/')
    .addGlobal('includePure', nunjucks.render);

const serverOptions = {
    key: read('./cert/key.pem'),
    cert: read('./cert/cert.pem')
};

http2.createServer(serverOptions, router)
    .listen(pkg.config.serverPort)
    .on('listening', () => console.log(`HTTP/2+SSL server listening on ${pkg.config.serverPort}`));
