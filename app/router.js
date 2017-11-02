'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'url',
  'areas/statics',
  'areas/homepage',
  'areas/error'
]

function factory ({ parse }, statics, homepage, error) {
  /**
   * @param {http.ClientRequest} req
   * @returns {function}
   */
  function getControllerAction (req) {
    const path = parse(req.url).pathname

    if (path.startsWith('/static/')) {
      return statics(path)
    } else if (path === '/') {
      return homepage
    } else {
      return error.notFound
    }
  }

  /**
   * @param {http.ClientRequest} req
   * @param {http.ServerResponse} res
   */
  return (req, res) => {
    try {
      getControllerAction(req)(req, res)
    } catch (err) {
      error.internalServerError(req, res, err)
    }
  }
}
