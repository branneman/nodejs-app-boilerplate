'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = ['send'];

const config = {
    root: `${process.cwd()}/app/`,
    acceptRanges: false,
    etag: false,
    cacheControl: false,
    lastModified: false
};

function factory(send) {
    return path => (req, res) => send(req, path, config).pipe(res);
}
