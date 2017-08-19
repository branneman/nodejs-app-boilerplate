'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = [
    'nunjucks',
    'lib/env',
    'lib/read',
    'lib/http-server'
];

function factory(nunjucks, env, read, httpServer) {

    nunjucks.configure(`${process.cwd()}/app/areas/`);

    const serverOptions = {
        key: read(env.APP_SERVER_CERT_KEY),
        cert: read(env.APP_SERVER_CERT_CERT)
    };

    return () => httpServer.start(serverOptions);

}
