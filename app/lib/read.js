'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = ['fs'];

function factory({ readFileSync }) {
    return file => readFileSync(file, 'utf8').toString();
}
