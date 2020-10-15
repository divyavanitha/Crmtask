const nodemailer = require('nodemailer');
const keys = require('./keys');




var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'selvakumaran.ram@gmail.com',
        pass:'@Shivakumar143'
    }
});

module.exports = transporter;