var express = require('express');
var withDb = require('./events.js');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: '3 words' });
});


router.get('/story', function(req, res) {
  res.redirect('/');
});

router.get('/story/:id', function(req, res) {
  var context = {
    res: res,
    story: req.params.id
  }
  withDb('got-posts', context);
});


router.post('/newpost', function(req, res) {
  var context = {
    res: res,
    post: {
      words: req.body.post,
      score: 0
    }
  };
  withDb('got-new-post', context);
});


module.exports = router;
