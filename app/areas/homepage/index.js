'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'lib/read',
  'lib/http-helpers',
  'lib/render-view',
  'areas/shared/layout/criticalcss'
]

function factory (read, { sendHTML, push }, render, layout) {
  const criticalCSSurl = '/static/css/critical/homepage.css'
  const criticalCSS = read(`${process.cwd()}/app${criticalCSSurl}`)

  /**
   * @param {http.ClientRequest} req
   * @param {http.ServerResponse} res
   */
  return (req, res) => {
    const viewData = Object.assign({}, layout.baseViewData, {
      httpVersion: req.httpVersion,
      criticalCSSurl,
      criticalCSS
    })

    push(res, criticalCSSurl, criticalCSS)
    sendHTML(res, 200, render('homepage/index', viewData))
  }
}
