const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
var session = require('express-session');
const Log = new (require('./config/winston'));
const i18n = require('i18n');
const helper = require('./services/helper.js');
const http = require("http"); 
const socketIo = require("socket.io"); 

i18n.configure({ 
  locales: ['en', 'ar'], 
  defaultLocale: 'en', 
  autoReload: true, 
  directory: __dirname + '/lang', 
  syncFiles: true 
});

//imported routes and others
const user = require('./routes/user.route');
const admin = require('./routes/admin.route');

const app = express();

dotenv.config(); 

// Create the http server 
const server = require('http').createServer(app); 
  
// Create the Socket IO server on  
// the top of http server 
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
}); 


app.use(i18n.init);
app.use((req, res, next) => {
  i18n.setLocale(res, 'en');
  next();
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session( { secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true } ));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch((e) => console.log('Connection Failure...', e));

app.use('/api', user);
app.use('/api/admin', admin);
  
app.use('/', express.static(path.join(__dirname,'/storage')));
app.use('/public', express.static(path.join(__dirname,'/public')));

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let code = err.status || 500;
  if(err.code == "LIMIT_FILE_SIZE"){
    code = 422;
  }
  res.status(code).json( helper.response(  { status: code, error : err, message: err.message }   ));
});

io.sockets.on('connection', function(socket) {

  socket.on('joinRoom', function(newroom) {

    socket.join(newroom);

    io.sockets.in(newroom).emit('socketStatus', { message: 'you are connected to chat '+ newroom });

    io.sockets.in(newroom).emit('newMessage', { message: 'test ' });

  });

  socket.on('joinChatRoom', function(newroom) {

    socket.join(newroom);

    io.sockets.in(newroom).emit('socketStatus', { message: 'you are connected to private chat '+ newroom });

  });

  socket.on('disconnect', function() {

  });

});

module.exports = { app: app, server: server }; 