//var database = require('../config/database')
var database = require('../lib/mongoose')
var postgre = require('../lib/postgredb')


class Cases {
    constructor() {
        this._model = 'case';
      }

    add(user,password,company,data) {
    	console.log(user,password,company,data);
    	postgre.addCase(user,password,company,data);
    	//addCase = function (user, password,company, data) 
    }
    // findAll(callback) {
    //     mongoclient.findAll(function(data) {
    //         callback(data);
    //     },this._model);
    // }

    // load() {
    //     mongoclient.drop(function(deleted) {
    //         if(deleted)
    //             mongoclient.loadPermissions();
    //     },this._model);
        
    // }
}

module.exports = Cases;





