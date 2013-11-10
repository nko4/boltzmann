require('nko')('PEQwj910D4L8Fc59');

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var match = require('./routes/match');
var meeting = require('./routes/meeting.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('B-I-N-G-O and Bingo was his name oh!'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/signup', user.create);
app.post('/login', user.login);
app.post('/meet', user.meet);
app.get('/match', match.notify);

app.get('/meetings', meeting.meetings);
app.get('/meeting/new', meeting.new_meeting)
app.get('/meeting/:id', meeting.get);
app.put('/meeting/:id', meeting.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
