const MongoClient = require('mongodb').MongoClient
var mongoDbHelper = require('../helpers/mongodb.helper');
var mongoDbConfig = require('../config/mongodb.config');

class MongoDbService {

    constructor() {
        this._connected = false;
    }

    /**
     * @return Promise which when resolved provides the connection to the db
     */
    connect() {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(mongoDbHelper.getMongoDbConnectionUrl()).then( (client) => {
                this._db = client.db(mongoDbConfig.db);
                console.assert(this._db);
                this._connected = true;
                resolve();
            }).catch( (error) => {
                console.log("Failed to connect to MongoDB");
                console.log(error);                
                reject(error);
            });
        }.bind(this));
    }

    getDb() {
        return new Promise(function(resolve, reject) {
            //TODO: check we haven't lost the connection, and if so restart it
            if (this._connected !== true) {
                this.connect().then( () => {
                    console.assert(this._db);
                    resolve(this._db);
                });
            } else {
                console.assert(this._db);
                resolve(this._db);    
            }
        }.bind(this));
    }
}

var mongoDbService = new MongoDbService();
module.exports = {
    connect: mongoDbService.connect,
    getDb: mongoDbService.getDb
}