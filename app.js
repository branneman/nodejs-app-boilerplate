'use strict';

// Force working dir to current folder
process.cwd(__dirname);

// Configure DI/IoC container
const IoC = require('electrolyte');
IoC.use(IoC.dir('.'));
IoC.use(IoC.dir('app'));
IoC.use(IoC.node_modules());

// Start
IoC.create('bootstrap')
    .then(app => app())
    .catch(err => {
        console.log(err.message);
        console.log(err.stack);
        return process.exit(-1);
    });
