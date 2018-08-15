var database = require('../config/database')
var database = require('../lib/mongoose')
var mongoclient = require('../lib/mongodb')


class Permissions {
    constructor() {
        this._model = 'permissions';
      }
    findAll(callback) {
        mongoclient.findAll(function(data) {
            callback(data);
        },this._model);
    }

    load() {
        mongoclient.drop(function(deleted) {
            if(deleted)
                mongoclient.loadPermissions();
        },this._model);
        
    }
}

module.exports = Permissions;





