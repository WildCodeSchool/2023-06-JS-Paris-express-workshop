const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const routes = require('../modules');

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(helmet());

app.use('/api', routes);

module.exports = app;