var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var tenantModel = require('../models/tenant');
var caseModel = require('../models/cases');
var MongoClient = require('mongodb').MongoClient;

var database = require('../config/database')
var auth = require('../config/auth')
var mongolib = require('../lib/mongoose')
var password = require('../lib/password')
var bcrypt = require('../lib/bcrypt')


module.exports = {
	add : function( req, res) {
		console.log('add case');
		var cases = new caseModel();
		// permission.add(function(data) {
		// 	res.status(200).send(data); 
		// });

		data = {
			  region_site : 'sample region site'
    		, location_unit : 'sample location unit'
    		, case_desc :'sample case desc'
   			, status: '2'
   			, resolution : '1'
		}
		cases.add('xxxx','xxxx','xxxx', data);
		res.status(200).send('data has been saved!');
	},

	// load : function ( req, res ) {
	// 	console.log('load');
	// 	var permission = new permissionModel();
	// 	permission.load();
	// 	res.status(200).send('Permissions has been loaded'); 
	// }
}
 