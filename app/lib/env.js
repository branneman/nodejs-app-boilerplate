'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'package.json',
  'lib/read'
]

function factory ({ env: defaultEnv }, read) {
  const dotenv = parseEnvFile(read(`${process.cwd()}/.env`))
  const parsed = Object.assign({}, defaultEnv, dotenv, process.env)

  return {
    parseEnvFile,
    splitPairs,
    trimQuotes,
    parsed
  }
}

/**
 * @param {String|Buffer} filecontents
 * @returns {Object}
 */
function parseEnvFile (filecontents) {
  return filecontents
    .split(/\r?\n/)
    .filter(line => line.indexOf('=') !== -1)
    .map(splitPairs)
    .map(tuple => tuple.map(str => str.trim()))
    .map(tuple => tuple.map(trimQuotes))
    .reduce(tupleToObjectPredicate, {})
}

/**
 * @param {String} str
 * @returns {[String, String]}
 */
function splitPairs (str) {
  const pos = str.indexOf('=')
  return [
    str.substr(0, pos),
    str.substr(pos + 1)
  ]
}

/**
 * @param {String} str
 * @returns {String}
 */
function trimQuotes (str) {
  const first = str[0]
  const last = str[str.length - 1]
  const hasSingle = first === `'` && last === `'`
  const hasDouble = first === `"` && last === `"`

  if (hasSingle || hasDouble) {
    return str.substring(1, str.length - 1)
  }
  return str
}

/**
 * @param {Object} acc
 * @param {[*, *]} tuple
 * @returns {Object}
 */
function tupleToObjectPredicate (acc, [ key, val ]) {
  acc[key] = val
  return acc
}
