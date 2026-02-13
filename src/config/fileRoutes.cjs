const { resolve } = require('node:path');
const express = require('express');


const uploudPath = resolve(__dirname, '..', '..', 'uploads');

const fileRouteConfig = express.static(uploudPath);

module.exports = fileRouteConfig;