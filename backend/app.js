const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')

const documentation = require('./routes/documentation')
const record = require('./routes/record')
const home = require('./routes/home')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true}))
app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookie());

app.use('/api/v1', documentation);
app.use('/api/v1', home);

module.exports = app