var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var emailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/users');
var models = require('./routes/models');
var watchface = require('./models/watchface');

var app = express();

mongoose.connect('mongodb://localhost:27017/facemakr');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.session({secret: 'facemakrio_38fmN83n*#(nlKj*3j'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', models);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.post('/request', function(req, res) {
    var transport = emailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'facemakr.io@gmail.com',
            pass: 'k3*jfm3Kifol1$158fjEMmne'
        }
    });
    var mailToUserOptions = {
        from: 'facemakr.io &lt; facemakr.io@gmail.com &gt;',
        to: req.body.email,
        subject: '',
        text: ''
    };
    var mailToSiteOptions = {
        to: 'facemakr.io &lt; facemakr.io@gmail.com &gt;',
        from: req.body.email,
        subject: '[facemakr.io] Beta Request',
        text: ''
    };
    transport.sendMail(mailToSiteOptions, function(err, resp) {
        if (err) {
            // An error occurred.
            resp.render();
        }
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(80, function() {
    console.log("Listening on port 80");
});

module.exports = app;
