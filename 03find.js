'use strict';

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(url, function(err, db) {
  // db gives access to the database
  var collection = db.collection('parrots');

  var documents = collection.find({
    age: { $gt: Number(process.argv[2]) }
  }).toArray(function(err, docs) {
    if(err) throw err;
    console.log(docs);
    db.close();
  });
});
