'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'url',
  'send'
]

const config = {
  root: `${process.cwd()}/app/`,
  acceptRanges: false,
  etag: false,
  cacheControl: false,
  lastModified: false
}

function factory ({ parse }, send) {
  return {

    /**
     * @param {http.ClientRequest} req
     * @returns {Boolean}
     */
    isStatic: req => {
      const path = parse(req.url).pathname
      return path.startsWith('/static/')
    },

    /**
     * @param {http.ClientRequest} req
     * @param {http.ServerResponse} res
     */
    staticAction: (req, res) => {
      const path = parse(req.url).pathname
      send(req, path, config).pipe(res)
    }

  }
}
