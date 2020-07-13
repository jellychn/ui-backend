const connectionString = 'mongodb+srv://jelly:J5447589@ui.juuke.mongodb.net/ui?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;

exports.connect = function() {
    return MongoClient.connect(connectionString, {useUnifiedTopology: true});
};
