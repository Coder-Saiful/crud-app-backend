const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const studentRouter = require('./routers/studentRouter');

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

app.use('/api/student', studentRouter);

module.exports = app;