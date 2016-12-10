var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


router.get('/', function(req, res, next) {
  res.render('index', { title: '3 words' });
});

router.get('/add', function(req, res, next) {
  res.render('newpost', { title: 'add post' });
});



router.get('/posts', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/threewords';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Failed to connect');
    } else {
      console.log('Connection established');

      var collection = db.collection('posts');

      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render('postlist', {
            'postlist': result
          });
        } else {
          res.send('No results found');
        }

        db.close();
      })
    }
  })
})

router.post('/newpost', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/threewords';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Failed to connect');
    } else {
      console.log('New post:', req.body.post);

      var post = {
        words: req.body.post,
        score: 0
      };

      var collection = db.collection('posts');

      collection.insert(post, function(err, result){
        if (err){
          console.log(post, 'was not added because', err);
        } else {
          console.log(post);
          res.redirect('add');
        }
        db.close();
      });
  }});
})

module.exports = router;
