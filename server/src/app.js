require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('./config/passport');
const {postScheduleTask} = require('./cron')
const {socketHandler} = require('./utils/socket')
const { clientSideSecurity } = require('./middlewares/auth.middleware');
const app = express();
const {Server} = require('socket.io')
const server = require('http').createServer(app)
//config lib middleware

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(
  session({
    secret: process.env.SECERT_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


//init database
require('./db/db.mongo');

//init mq
// const produce = require('./mq/producer')
// const consume = require('./mq/consumer')
// consume().catch(console.error)
//init route
app.get('/run', (req, res) => {
  res.send('SERVER IS RUNNING')
  // produce("HI MQ LALA")
})

app.use(clientSideSecurity);
app.use('/', require('./routes/index'));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
});
socketHandler(io)


//init cron jobs
postScheduleTask.start()

//handle error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res
    .status(statusCode)
    .json({ message: error.message || 'Interval Server Error' });
});

module.exports = server;
