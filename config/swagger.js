const yaml = require("yamljs");

const swaggerDocument = yaml.load("./doc/index.yaml");

module.exports = { swaggerDocument };
