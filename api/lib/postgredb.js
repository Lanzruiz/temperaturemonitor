//var database = require('../config/database')
var pg = require('pg');
const fse = require('fs-extra');

module.exports.getPostgresDbConnectionUrl = function(company) {
	return format(
		'postgres://%s:%s@%s:%s/%s', 		
		encodeURIComponent(process.env.POSTGRESDB_USER),
		encodeURIComponent(process.env.POSTGRESDB_PASS),
		encodeURIComponent(process.env.POSTGRESDB_HOST),
		encodeURIComponent(process.env.POSTGRESDB_PORT),
		encodeURIComponent(company));		
}

module.exports.addCase = function (user, password,company, data) {

	var conString = getPostgresDbConnectionUrl(company);

	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		client.query("CREATE TABLE IF NOT EXISTS CASES (id SERIAL NOT NULL PRIMARY KEY, region_site varchar(450) NOT NULL, location_unit varchar(450) NOT NULL, case_desc text, assignee varchar(450), date_created timestamp NOT NULL, status integer NOT NULL DEFAULT '1', resolution integer NOT NULL DEFAULT '1')", 
			function(err, result) {
			if(err)
				return console.error('Create Database Error', err);
		    client.query('INSERT INTO CASES(region_site, location_unit, case_desc, date_created, status, resolution) values($1, $2 ,$3, to_timestamp($4), $5, $6)',
			[data.region_site
			, data.location_unit
			, data.case_desc
			, Date.now()
			, data.status
			, data.resolution]);
			});
	    client.on("error", function (err) {
	        console.log("DB insertion failed. Error Message: " + err, null);
	        return;
	    });
	});
}