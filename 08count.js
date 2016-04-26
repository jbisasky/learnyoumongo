'use strict';

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
  if(err) throw err;

  var collection = db.collection('parrots');

  collection.count({
    age: {$gt: Number(process.argv[2])}
  }, function(err, count) {
    console.log(count);
    db.close();
  });
});
