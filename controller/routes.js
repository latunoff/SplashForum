const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('../model/config.js');
const api_pref = '/api';

//console.log(path);
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Sends homepage to browser
router.get(api_pref + "/", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Sends all existing threads to homepage for display
router.get(api_pref + '/threads', function(req, res) {
    var query = "SELECT threads.*, COUNT(replies.thread_id) AS count, users.email `user` FROM threads LEFT JOIN replies ON threads.id = replies.thread_id LEFT JOIN users ON users.id = threads.user_id GROUP BY threads.id";
    connection.query(query, function(err, data) {
      if (err) {
        throw err;
      } else {
        res.json(data);
      };
    });
});

// Sends a single thread to browser when user selects one from homepage
router.get(api_pref + '/thread/:id', function(req, res) {
  var id = req.params.id;
  var query = 'SELECT threads.*, users.email `user` FROM threads LEFT JOIN users ON threads.user_id = users.id WHERE threads.id = ' + id;
  connection.query(query, function(err, data) {
    res.json(data);
  })
})

// Sends all replies for a single thread when a thread is selected from the homepage
router.get(api_pref + '/reply/:id', function(req, res) {
  var id = req.params.id;
  var query = "SELECT replies.*, users.email `user` FROM replies LEFT JOIN users ON replies.user_id = users.id WHERE replies.thread_id = " + id;
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
    } else {
    res.json(data);
    }
  });
});

// Receives new thread from user and saves to database
router.post(api_pref + '/newthread', function(req, res) {
  var thread = req.body;
  var saveThread = 'INSERT INTO threads ( user_id, title, message ) VALUES ( "' + thread.userId + '", "' + thread.title + '", "' + thread.message + '" )';
  connection.query(saveThread, function(err, data) {
    err ? console.log(err) : res.json('success');    
  })
})

// Receives new reply from user and saves to database for any given thread
router.post(api_pref + '/newreply', function(req, res) {
  var reply = req.body;
  var saveReply = 'INSERT INTO replies ( thread_id, prnt_id, user_id, message) VALUES ( ' + reply.id + ', "' + reply.prntId + '", "' + reply.userId + '", "' + reply.reply + '")';
  connection.query(saveReply, function(err, data) {
    err ? console.log(err) : res.json('success');        
  });
})

// Receives and authenticates login information from existing users
router.post(api_pref + '/existinguser', function(req, res) {
  var email = req.body.email;
  var query = "SELECT * FROM users WHERE `email` = '" + email + "'";
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
      res.json('unsuccessful');
    } else if (data.length === 0) {
      res.json('unsuccessful');
    } else {
      var savedHash = data[0].password;
      bcrypt.compare(req.body.password, savedHash, function(err, status) {
        console.log('Password check status: '+status + '; hash:'+savedHash);
        status === true ? res.json(data[0].id) : res.json(0);
      });
    }
  });
});

// Accepts login information from new users, checks if the email exists, and saves the user if unique
router.post(api_pref + '/newuser', function(req, res) {
  var email = req.body.email;
  var query = "SELECT * FROM users WHERE `email` = '" + email + "'";
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
      res.json('Error');
    } else {
      if (data.length > 0) {
        res.json('unsuccessful');
      } else {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password1, 10, function(err, hash) {
              var saveUser = "INSERT INTO users ( email, password ) VALUES ( '" + email + "', '" + hash + "' )";
              connection.query(saveUser, function(err, data) {
                err ? console.log(err) : res.json('success');
              })
            });
        });
      }
    }
  });
});

// Sends user's data to browser
router.get(api_pref + '/userget/:id', function(req, res) {
  var id = req.params.id;
  var query = "SELECT * FROM users WHERE id = '" + id + "'";
  //console.log(query);
  connection.query(query, function(err, data) {
    res.json(data);
  })
});

// Sends user's data to browser
router.post(api_pref + '/user_save', function(req, res) {
  var data = req.body;
  var saveDataQuery = "UPDATE users SET `name`='" + data.name + "'";//, `email`='" + data.email + "'";
  if (data.pass > '') saveDataQuery += "`password`='" + data.pass + "'";
  saveDataQuery += " WHERE `id`='" + data.userId + "'";
  connection.query(saveDataQuery, function(err, data) {
    err ? console.log(err) : res.json('success');        
  });
});

module.exports = router;