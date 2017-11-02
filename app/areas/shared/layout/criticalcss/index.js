'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['lib/read']

function factory (read) {
  return {
    baseViewData: {
      loadCSScore: read(`${process.cwd()}/app/static/js/loadCSS.min.js`),
      loadCSSrelPreload: read(`${process.cwd()}/app/static/js/cssrelpreload.min.js`)
    }
  }
}
