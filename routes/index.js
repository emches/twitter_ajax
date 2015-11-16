var express = require('express');
var router = express.Router();
// var Tweet = require('../models/tweet.js')(twitterjsDB);
// var User = require('../models/user.js')(twitterjsDB);
var User = require('../models/index.js').User;
var Tweet = require('../models/index.js').Tweet;
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
    // var tweets = tweetBank.list();
    // res.render('index', {
    //     title: 'Twitter.js',
    //     tweets: tweets
    // });

    //var attributes = [ 'tweet', ['User.name', 'name']]
    Tweet
        .findAll({
            attributes: ['tweet'],
            include: [{
                model: User,
                attributes: ['name']
            }],
        }).then(function(tweets) {
            var mapTweets = tweets.map(function(tweet) {
                // console.log("TWEE:", tweet);
                                var newObj = {}
                newObj.id = tweet.id
                newObj.name = tweet.User.name;
                newObj.tweet = tweet.tweet;
                return newObj;
            })
            // console.log("MAPTWEET: " + mapTweets)
                // console.log("TWEETS: " + JSON.stringify(tweets[0])) ;

            res.render('index', {
                title: 'Twitter.js',
                tweets: mapTweets
            });


        });


});

function getTweet(req, res) {

    User
        .findOne({
            where: {
                name: req.params.name
            },
            attributes: ['name'],
            include: [{
                model: Tweet,
                attributes: ['tweet', 'id']
            }],
        })
        .then(function(user) {
            // console.log("USER: " + JSON.stringify(user))
            var mapTweets = user.Tweets.map(function(tweet) {
                var newObj = {}
                newObj.id = tweet.id
                newObj.name = user.name;
                newObj.tweet = tweet.tweet;
                return newObj;
            });

            if (req.params.id){
                 mapTweets = mapTweets.filter(function(tweet){
                    console.log(tweet, "tweetID: " + tweet.id ,"PARAM_ID: " + req.params.id )
                    return tweet.id == req.params.id;
                });
            }
            console.log("Mapped: ", mapTweets);
            res.render('index', {
                tweets: mapTweets
            });
       });
}



router.get('/users/:name', getTweet);
router.get('/users/:name/tweets/:id', getTweet);

// note: this is not very REST-ful. We will talk about REST in the future.
router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var user = User.findOrCreate({
        where : { name: name }
    }).then(function(user) {
        console.log("CREATED USER: " + user)
       Tweet.create({UserId:user.id, tweet: text});

    });

    // var user = User.create({name:})
    res.redirect('/');
});

module.exports = router;
