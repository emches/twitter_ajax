var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

function getTweet (req, res){
  var tweets = tweetBank.find(req.params);
  res.render('index', { tweets: tweets });
}

router.get('/users/:name', getTweet);
router.get('/users/:name/tweets/:id', getTweet);

// note: this is not very REST-ful. We will talk about REST in the future.
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;


