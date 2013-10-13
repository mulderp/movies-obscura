var restify = require('restify');
var _ = require('underscore');
var fs = require('fs');
var redis = require('redis'),
    client = redis.createClient();

var movies = require('./movies.js');

var server = restify.createServer({ name: 'movies' });
var crypto = require('crypto');

var Promise = require("bluebird");
//assume client is a redisClient
Promise.promisifyAll(client);

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


server.get('/movies/top', function (req, res, next) {
  res.send(Movies);
})

server.post('/movies/like', function(req, res, next) {
  console.log(req.body);
  res.send("OK");
});

server.get('/genres/all', function (req, res, next) {
  var genres = _.chain(Movies)
                .map(function(movie) { return movie.genres })
                .flatten()
                .uniq()
                .value();
  var genres_ids = _.chain(genres)
                 .inject(function(seed, item) { seed.push({ id: _.size(seed), name: item }); return seed }, [])
                 .value()
  res.send(genres_ids);
})


// auth
function createUser(raw, success_cb, fail_cb) {

 var userId;

 client.incrAsync('users.count').then(function(id){
    userId = id;
    return client.hmsetAsync(
          'user:' + id,
          'username', raw.username,
          'password', raw.password,
          'email', raw.email
      );
    }).then(function() {
       client.setAsync("username.to.id:" + raw.username.toLowerCase(), userId);
    }).then(function(){
        return client.hmgetAsync('user:'+userId, 'username', 'email');
    }).then(function(data) {
      success_cb(userId, data);
    }).catch(function(err){
      fail_cb(err);
    });
};


server.post('/auth/create_user', function(req, res, next) {
  function success(userId, data) {
      console.log("user created: " + data);
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

// return 200 and user if session is found
//
server.get('/auth/session', function(req, res, next) {
  console.log("*** check session");
  console.log(req.headers);
  var cookies = get_cookies(req);
  console.log(cookies); 
  var userId;
  client.getAsync('auth:' + cookies.session).then(function(id) {
    userId = id;
    console.log(id);
    if (id == null) {
      res.send(403, {error: "Session not found"});
      res.end();
      return
    }
    return client.hmgetAsync('user:'+id, 'username', 'email');
  }).then(function(data) {
    console.log(data);
    console.log("found");
    console.log("success");
    res.send({auth: 'OK', id: userId, username: data[0], email: data[1]});  
    res.end();
    return
  }).catch(function(err) {
      res.send('500', { error: err });
      res.end();
      console.log(err);
      return
  });
});

server.del('/auth/session', function(req, res, next) {
  console.log("*** logout");
  var cookies = get_cookies(req);
  client.delAsync("auth:" + cookies.session).then(function() {
    res.send(200);
  }).catch(function(err) {
    console.log(err);
    res.send("500", {error: err});
  });

});

function lookupUserId(username, cb, fail_cb) {
  client.getAsync("username.to.id:" + username.toLowerCase())
    .then(function(id) {
      userId = id;
      return client.hmgetAsync('user:' + id, 'username', 'email');
    }).then(function(data) {
       cb(userId, data[0], data[1]);
     }).catch(function(err) {
       fail_cb(err); 
     });
}

function get_rand() {
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

server.post('/auth/session', function(req, res, next) {
  console.log("****");
  var userId;
  var raw = req.body;
  console.log(raw);
  console.log(raw.username);
  var key = get_rand();
  lookupUserId(raw.username, function(userId) {
    client.set("auth:" + key, userId);
    res.header('Set-Cookie', 'session=' + key + '; HttpOnly');    
  }, function(err) {
    console.log(err);
  });

  lookupUserId(raw.username, function(id, username, email) {
    res.send({auth: 'OK', id: id, username: username, email: email}); 
  });
});

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

//  var userId;
//
//
//  async.waterfall([
//    function(cb) {
//      // Increase
//      client.hincrby('users', 'count', 1, cb);
//    },
//    function(id, cb) {
//      // Higher Scope a userId variable for access later.
//      userId = id;
//      console.log(userId);
//      // Set
//      client.hmset('user:'+id, 
//        'username', raw.username, 
//        'password', raw.password, 
//        'email', raw.email, 
//        cb);
//    },
//    function(write, cb) {
//      client.hmget('user:'+userId, 'username', 'email', cb);
//    }
//  ], function(err,read){
//      if (err) {
//        fail_cb(err);
//      }
//      success_cb(userId, read);
//  })
//

// ***** helpers
var get_cookies = function(request) {
  var cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};
