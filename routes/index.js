var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
