var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var permissionModel = require('../models/permission');
var MongoClient = require('mongodb').MongoClient;

var database = require('../config/database')
var auth = require('../config/auth')
var mongolib = require('../lib/mongoose')
var password = require('../lib/password')
var bcrypt = require('../lib/bcrypt')
var mongoose = require('mongoose');
var pgtools = require('pgtools');
var fs = require('fs');
var pg = require('pg');
const fse = require('fs-extra');


module.exports = {
	list : function( req, res) {
		console.log('list');
		var permission = new permissionModel();
		permission.findAll(function(data) {
			res.status(200).send(data); 
		});
	},

	load : function ( req, res ) {
		console.log('load');
		var permission = new permissionModel();
		permission.load();
		res.status(200).send('Permissions has been loaded'); 
	}
}
 