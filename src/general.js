const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const generalRoute = require('./routes/general.js');
const helmet = require('helmet');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { GEN, NODE_ENV } = process.env;
NODE_ENV !== "production" ? app.use(morgan('dev')) : app.use(morgan('combined'));

app.use(helmet());
app.use(cors());
app.use('/', generalRoute);

app.listen(GEN);
if (NODE_ENV !== "production" ) {
    console.log(`GCP Pub-Sub system general is running at http://localhost:${GEN}`);
}
