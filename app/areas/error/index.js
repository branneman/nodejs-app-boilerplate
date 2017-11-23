'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'lib/env',
  'lib/http-helpers',
  'lib/render-view'
]

function factory ({ parsed: env }, { sendHTML }, render) {
  return {

    /**
     * @param {http.ClientRequest} req
     * @param {http.ServerResponse} res
     */
    notFound: (req, res) => {
      sendHTML(res, 404, render('error/404', {}))
    },

    /**
     * @param {http.ClientRequest} req
     * @param {http.ServerResponse} res
     * @param {Error} err
     */
    internalServerError: (req, res, err) => {
      const shownErr = env.NODE_ENV !== 'production' ? err : null
      sendHTML(res, 500, render('error/500', { err: shownErr }))
    }

  }
}
