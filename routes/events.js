var mongodb = require('mongodb');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();


events.on('got-posts', function(db, context) {

  var r = context.res;

  db.collection('posts').find({}).toArray(function(err, result) {

    if (err)
      r.send(err);
    else if (result.length)
      r.render('postlist', {'postlist': result});
    else
      r.send('No posts!');

    db.close();
  });
});


events.on('got-new-post', function(db, context) {

  var post = context.post, r = context.res;

  db.collection('posts').insert(post, function(err, result) {

    if (err)
      r.send(err);
    else
      r.redirect('add');

    db.close();
  });
});


// Trigger events from inside the Mongo Client:

function withDb(trigger, context) {

  var url = 'mongodb://localhost:27017/threewords';

  mongodb.MongoClient.connect(url, function(err, db) {
    if (err)
      console.log("Couldn't connect to", url);
    else {
      console.log("Connected to", url);

      events.emit(trigger, db, context);
    }
  });
}

module.exports = withDb;
