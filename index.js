'use strict'

// Enforce working dir to current folder
process.cwd(__dirname)

// Enforce the right Node.js version
const version = require('./package.json').engines.node
if (process.version.substr(1) !== version) {
  throw new Error(`Node.js version mismatch!\n Required v${version}\n Detected ${process.version}`)
}

// Configure DI/IoC container
const IoC = require('electrolyte')
IoC.use(IoC.dir('.'))
IoC.use(IoC.dir('app'))
IoC.use(IoC.node_modules())

// Start app
IoC.create('bootstrap')
  .then(app => app())
  .catch(err => {
    console.log(err.message)
    console.log(err.stack)
    return process.exit(-1)
  })
