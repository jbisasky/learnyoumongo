'use strict';

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
  if(err) throw err;
  var collection = db.collection('prices');

  // collection.find({
  //   size: process.argv[2]
  // }, {
  //   name: 1,
  //   price: 1,
  //   _id: 0
  // }).toArray(function(err, docs) {
  //   if(err) throw err;
  //   console.log(docs);
  //   db.close();
  // });

  collection.aggregate([
    { $match: {size: process.argv[2]} },
    { $group: {
        _id: 'total',
        total: {
          $sum: '$price'
        },
        average: {
          $avg: '$price'
        }
      }
    }
  ]).toArray(function(err, results) {
    //console.log(Number(results).toFixed(2));
    console.log(Number(results[0].average).toFixed(2));
    db.close();
  });
});
