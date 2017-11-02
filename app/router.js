'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'middlewarejs',
  'areas/statics',
  'areas/homepage',
  'areas/error'
]

function factory (middleware, statics, homepage, error) {
  const get = url => req => req.url === url

  const app = middleware()
  app.use(statics.isStatic, statics.staticAction)
  app.use(get('/'), homepage)
  app.use(error.notFound)

  /**
   * @param {http.ClientRequest} req
   * @param {http.ServerResponse} res
   */
  return (req, res) => {
    try {
      app.run(req, res)
        .catch(err => error.internalServerError(req, res, err))
    } catch (err) {
      error.internalServerError(req, res, err)
    }
  }
}
