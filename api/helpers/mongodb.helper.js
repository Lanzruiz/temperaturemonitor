var mongoDbConfig = require('../config/mongodb.config');
var AppError = require('../models/appError.model');


class MongoDbHelper {
    getMongoDbConnectionUrl() {
        // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
        if (mongoDbConfig.host == null) {
            throw new AppError("Invalid or missing MongoDb connection details", AppError.INVALID_APP_CONFIG);
        }
        var connectionUrl = "mongodb://";
        if (mongoDbConfig.user != null && mongoDbConfig.user != "") {
            connectionUrl += mongoDbConfig.user;
            if (mongoDbConfig.pass != null && mongoDbConfig.pass != "") {
                connectionUrl += ":" + mongoDbConfig.pass;
            }
            connectionUrl += "@";
        }
        connectionUrl += mongoDbConfig.host;
        if (mongoDbConfig.port != null && mongoDbConfig.port != "") {
            connectionUrl += ":" + mongoDbConfig.port;
        }
        if (mongoDbConfig.db != null && mongoDbConfig.db != "") {
            connectionUrl += "/" + mongoDbConfig.db;
        }
        console.log("[" + connectionUrl + "]");
        return connectionUrl;
    }
}

var mongoDbHelper = new MongoDbHelper();
module.exports = {    
    getMongoDbConnectionUrl : function() { return mongoDbHelper.getMongoDbConnectionUrl(); },
};
