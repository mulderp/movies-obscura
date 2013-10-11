var restify = require('restify');
var _ = require('underscore');
var fs = require('fs');
var redis = require('redis'),
    client = redis.createClient();

var movies = require('./movies.js');

var server = restify.createServer({ name: 'movies' });
var async = require('async');
var crypto = require('crypto');

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


server.get('/movies/top', function (req, res, next) {
  res.send(Movies);
})

server.get('/genres/all', function (req, res, next) {
  var genres = _.chain(Movies)
                .map(function(movie) { console.log(movie); return movie.genres })
                .flatten()
                .uniq()
                .value();
  var genres_ids = _.chain(genres)
                 .inject(function(seed, item) { seed.push({ id: _.size(seed), name: item }); return seed }, [])
                 .value()
  //console.log(genres);
  res.send(genres_ids);
})


// auth
function createUser(raw, success_cb, fail_cb) {

  var userId;

  console.log("enter");

  async.waterfall([
    function(cb) {
      // Increase
      client.hincrby('users', 'count', 1, cb);
    },
    function(id, cb) {
      // Higher Scope a userId variable for access later.
      userId = id;
      console.log(userId);
      // Set
      client.hmset('user:'+id, 
        'username', raw.username, 
        'password', raw.password, 
        'email', raw.email, 
        cb);
    },
    function(write, cb) {
      client.hmget('user:'+userId, 'username', 'email', cb);
    }
  ], function(err,read){
      if (err) {
        fail_cb(err);
      }
      success_cb(userId, read);
  })
};


server.post('/auth/create_user', function(req, res, next) {
  function success(userId, data) {
      res.send({id: userId, username: data[0], email: data[1]});
  };
  function fail(err) {
        res.send('500', { error: err });
        res.writeHead(500);
        res.end();
        console.log(err);
        return;
  }
  createUser(req.body, success, fail);
})

server.post('/auth/session', function(req, res, next) {
  console.log("****");
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var key = crypto.createHash('sha1').update(current_date + random).digest('hex');
  res.header('Set-Cookie', 'session=' + key + '; HttpOnly');
  res.send({auth: 'OK'});
})

server.get('/auth/ping', function(req, res, next) {
  console.log("***** " + req);
  console.log(req.headers);
  res.send("pong");
});

server.post('/auth/user', function(req, res, next) {
  res.send({auth: "my_secret_token2"});
});

//serve static content
server.get(/\/.*/, restify.serveStatic({
    directory: './public',
    default: 'index.html'
}));
 
var port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url)
})
