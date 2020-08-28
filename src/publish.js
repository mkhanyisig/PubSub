const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const ordersRoute = require('./routes/publish');
const helmet = require('helmet');
const cors = require('cors');
//const setup= require('setup')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//console.log(process.env);
console.log('The value of PORT is:', process.env.MAIN_PORT);
const { MAIN_PORT, NODE_ENV } = process.env;
console.log('The 2nd value of PORT is:', MAIN_PORT);
console.log('Node Env:', NODE_ENV);
//MAIN_PORT===undefined ? MAIN_PORT=8001 : console.log("all is well");
NODE_ENV !== "production" ? app.use(morgan('dev')) : app.use(morgan('combined'));

app.use(helmet());
app.use(cors());
app.use('/', ordersRoute);

const server = app.listen(MAIN_PORT);

process.once('SIGUSR2', function () {
  server.close(function () {
    process.kill(process.pid, 'SIGUSR2')
  })
})

if (NODE_ENV !== "production" ) {
    console.log(`Publish service is running at http://localhost:${MAIN_PORT}`);
}
