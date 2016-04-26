'use strict';

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
  if(err) throw err;
  var collection = db.collection('parrots');

  collection.find({
    age: { $gt: Number(process.argv[2]) }
  }, {
    name: 1,
    age: 1,
    _id: 0
  }).toArray(function(err, docs) {
    if(err) throw err;
    console.log(docs);
    db.close();
  });
});
