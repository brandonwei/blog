var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog';

var insert = function(collection, data, callback) {
    MongoClient.connect(url, function(err, db) {
        var col = db.collection(collection);
        col.insert(data, function(err, result) {
            if (err) {
                return;
            }
            db.close();
            callback(result);
        });
    });
};

var update = function(collection, data, change, callback) {
    MongoClient.connect(url, function(err, db) {
        var col = db.collection(collection);
        col.update(data, change, function(err, result) {
            if (err) {
                return;
            }
            db.close();
            callback(result);
        })
    });
};

var remove = function(collection, data, callback) {
    MongoClient.connect(url, function(err, db) {
        var col = db.collection(collection);
        col.remove(data, function(err, result) {
            if (err) {
                return;
            }
            db.close();
            callback(result);
        });
    });
};

var find = function(collection, data, callback) {
    MongoClient.connect(url, function(err, db) {
        var col = db.collection(collection);
        col.find(data).toArray(function(err, result) {
            if (err) {
                return;
            }
            db.close(); 
            callback(result);
        });
    });
};

var dao_mongo = {};
dao_mongo.insert = insert;
dao_mongo.update = update;
dao_mongo.remove = remove;
dao_mongo.find = find;

module.exports = dao_mongo;

