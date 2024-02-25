const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')

const documentation = require('./routes/documentation')
const process = require('./routes/process')
const record = require('./routes/record')
const home = require('./routes/home')
const user = require('./routes/auth')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true}))
app.use(express.json({limit:'1gb'}));

app.use(express.urlencoded({limit: "1gb", extended: true }));
app.use(cookie());

app.use('/api/v1', documentation);
app.use('/api/v1', process);
app.use('/api/v1', home);
app.use('/api/v1', user);

module.exports = app