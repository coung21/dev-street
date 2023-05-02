const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('./config/passport')
const auth = require('./routes/auth')
dotenv.config();

//server
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet());
app.use(morgan('dev'));

app.use(passport.initialize())

//api
app.get('/', (req, res) => {
  res.send('hello, world');
});

app.use('/api/auth', auth)

//database
mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(5000, () => {
    console.log('app is running');
    console.log('connected to database')
  });
}).catch((error) => {
  console.log('can not connect to database')
})
