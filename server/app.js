const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const socketio = require('socket.io');
const Log = new (require('./config/winston'));
const i18n = require('i18n');
var helper = require('./services/helper.js');

i18n.configure({ 
  locales: ['en', 'ar'], 
  defaultLocale: 'en', 
  autoReload: true, 
  directory: __dirname + '/lang', 
  syncFiles: true 
});

//imported routes and others
const user = require('./routes/user.route');
const admin = require('./routes/admin/auth.route');

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

dotenv.config(); 

app.use(i18n.init);
app.use((req, res, next) => {
  i18n.setLocale(res, 'en');
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

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch((e) => console.log('Connection Failure...', e));

app.use('/api', user);
app.use('/api/admin', admin);

//const setup = require('./setup');
/* const users = require('./routes/users');
const profile = require('./routes/profile');
const gigs = require('./routes/gigs.route');
const postjob = require('./routes/postjob.route')
const upload=require('./routes/upload.route')
const transulated=require('./routes/multi.route')
const timezone=require('./routes/time.route') */


//const admin=require('./routes/admin/auth')

//const { Chat } = require("./models/chat");

//const chat=require('./routes/chat.route')



//app.use(morgan('combined', { stream: logger.stream }));
/* 






mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch((e) => console.log('Connection Failure...', e)); */

/* app.use(cors());

app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/setup', setup);
//app.use('/api/profile', profile);
app.use('/api/gigs', gigs); 
app.use('/api/postjob', postjob);
app.use('/api/trans',transulated)

app.use('/uploads', express.static(path.join(__dirname,'/server/uploads')));
app.use('/api/uploads', upload);

app.use('/api/timezone',timezone);

app.use('/api/admin',admin); */

// //transulate
// translate('Ik spreek Engels', {to: 'en'}).then(res => {
//     console.log(res.text);
//     // res.json({transulated:data.text})
    
//     //=> I speak English
//     console.log(res.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error(err);

// })
/*  app.use('/api/chat', chat);

 io.of('/api/chat/message').on("connection", socket => {

    socket.on("Input Chat Message", msg => {
     console.log("Socig");
      connect.then(db => {
        try {
            let chat = new Chat({ message: msg.chatMessage, sender:req.body.user, type: msg.type })
  
            chat.save((err, doc) => {
              console.log(doc)
              if(err) return res.json({ success: false, err })
  
              Chat.find({ "_id": doc._id })
              .populate("sender")
              .exec((err, doc)=> {
  
                  return io.emit("Output Chat Message", doc);
              })
            })
        } catch (error) {
          console.error(error);
        }
      })
     })
  
  }) */




  
app.use('/', express.static(path.join(__dirname,'/storage')));

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

/*server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});*/

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
  res.status(err.status || 500).json( helper.response(  { status: err.status || 500, error : err }   ));
});

module.exports = app;