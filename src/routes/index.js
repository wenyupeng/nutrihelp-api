const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger')

const router = express.Router();
const routesDir = __dirname;

fs.readdirSync(routesDir)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => {
        logger.debug('router file path: ', path.join(routesDir, file));
        const route = require(path.join(routesDir, file));

        // support router or object {path, router}
        if (route && typeof route === 'function' && route.stack && Array.isArray(route.stack)) {
            router.use(`/${path.basename(file, '.js')}`, route);
        } else if (route.router && route.path) {
            router.use(route.path, route.router);
        } else {
            console.warn(`Route file '${file}' does not export a valid router`);
        }
    });

module.exports = router;
