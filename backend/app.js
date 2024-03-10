const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')

const documentation = require('./routes/documentation')
const process = require('./routes/process')
const inquiries = require('./routes/inquiries')
const answers = require('./routes/answers')
const home = require('./routes/home')
const user = require('./routes/auth')
const analyze = require('./routes/analysis')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true}))
app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookie());

app.use('/api/v1', documentation);
app.use('/api/v1', process);
app.use('/api/v1', inquiries);
app.use('/api/v1', answers);
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', analyze);

module.exports = app