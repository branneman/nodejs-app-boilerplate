'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = [
    'http2',
    'lib/env',
    'router'
];

const msg = loc => `HTTP/2+SSL server listening on https://localhost:${loc.port}/`;

function factory(http2, env, router) {
    return {
        start: serverOptions => {
            const server = http2
                .createServer(serverOptions, router)
                .listen(env.APP_SERVER_PORT)
                .on('listening', () => console.log(msg(server.address())));
        }
    };
}
