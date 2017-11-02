'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['package.json']

function factory ({ env: defaultEnv }) {
  return Object.assign({}, defaultEnv, process.env)
}
