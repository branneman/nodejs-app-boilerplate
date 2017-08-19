'use strict';

module.exports = factory;
module.exports['@singleton'] = true;
module.exports['@require'] = ['nunjucks'];

function factory({ render }) {
    return (file, viewData = {}) => render(`${file}.njk`, viewData);
}
