var MongoClient = require('mongodb').MongoClient;
var database = require('../config/database')
var ObjectId = require('mongodb').ObjectID;
var pgtools = require('pgtools');
var fs = require('fs');
var pg = require('pg');
const fse = require('fs-extra');
var format = require('util').format;
var assert = require('assert');

const config = {
        user: 'postgres',
        password: 'root',
        port: 5433,
        host: 'localhost'
}

var rest = [];

var mongoDbConnectionUrl = format(
	'mongodb://%s:%s@%s:%s/admin?authMechanism=%s', 		
	encodeURIComponent(process.env.MONGODB_USER),
	encodeURIComponent(process.env.MONGODB_PASS),
	encodeURIComponent(process.env.MONGODB_HOST),
	encodeURIComponent(process.env.MONGODB_PORT),
	encodeURIComponent(process.env.MONGODB_AUTH_MECHANISM));

module.exports.loadPermissions = function(){
	MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		fs = require('fs');
		readline = require('readline');
 		var dbo = db.db(env.database);

		var rl = readline.createInterface({
	      input : fs.createReadStream('./sql/permissions.txt'),
	      output: process.stdout,
	      terminal: false
		})
		var permissions = [];
		rl.on('line',function(line){
			try{
				var splitter = line.split(',');
				var myobj = {name : splitter[0], hasTenant : splitter[1], hasSite : splitter[2] }
				dbo.collection('permissions').insertOne(myobj);
            }
            catch (err){
                console.log(err);
            }
		})

		rl.on('close',function(){
            db.close();
            console.log('***************completed');
        });
	});
}    

//module.exports.save = function(callback, data, model) {
module.exports.save = function(data, model) {

    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		
	    console.log("Connected correctly to server");
        var dbo = db.db(env.database);
	    var myobj = data;
		dbo.collection(model).insertOne(myobj, function(err, res) {
           if (err) throw err;
 	       console.log("1 document inserted");

	//		createTenantDb(data.company,data.password);
		    //pgtools.createdb(config, data.company, function (err, res) {
     //   if (err) {
    //      process.exit(-1);
        });

    });

  //     console.log('ssssssssssssssssssssssssss');
  //     var stream = fs.createWriteStream("sql/role.sql");
  //     stream.once('open', function(fd) {
  //     stream.write("CREATE DATABASE"+data.company)
  //     stream.write("CREATE USER "+data.company+" WITH PASSWORD '"+data.password+"';");
  //     stream.write("grant all privileges on "+data.company+" to "+data.company+";");

  //       //stream.write("My second row\n");
  //       //stream.end();


  //     var sql = fs.readFileSync('sql/role.sql').toString();

  //     //var sql = 'CREATE USER'

	 //      pg.connect('postgres://postgres:Bounce1234@localhost:5433/postgres', function(err, client, done){
	 //          if(err){
	 //              console.log('error: ', err);
	             
	 //          }
	 //          client.query(sql, function(err, result){
	 //              done();
	 //              if(err){
	 //                  console.log('error: ', err);
	                 
	 //              }
	              
	 //          });
	 //      });
  //     });
		//     db.close();
		// });
   // });

}	

createTenantDb = function (company, password) {

	var conString = 'postgres://postgres:root@localhost:5432/postgres';

	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		client.query('CREATE DATABASE '+company, function(err, result) {
			if(err)
				return console.error('Create Database Error', err);
			console.log('DATABASE CREATED...')
			client.query("CREATE USER "+company+" WITH PASSWORD '"+password+"'", function(err, result) {
				if(err)
					return console.error('Create User Error',err);
				console.log('USER CREATED...');
				client.query("GRANT ALL PRIVILEGES ON DATABASE "+company+" TO "+company, function(err,result) {
					if(err)
						return console.error('Error on assigning privileges',err);
					console.log('PRIVILEGES GRANTED....');
				});
			});
		});

	    client.on("error", function (err) {
	        console.log("DB insertion failed. Error Message: " + err, null);
	        return;
	    });
	});
}

module.exports.update = function(data,model) {

	MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(env.database);
		  var myquery = { company: data.company};
		  var newvalues = { $set: data };
		  dbo.collection(model).updateOne(myquery, newvalues, function(err, res) {
		    if (err) throw err;

		    console.log("1 document updated");
		    db.close();
		  });
    });

}	

module.exports.drop = function(callback,model) {
	MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(env.database);
	  dbo.collection(model).drop(function(err, delOK) {
	    if (err) throw err;
	    callback(delOK);
	    db.close();
	  });
	});
}


module.exports.deletePermissionByUserId = function(callback,id) {
	MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(env.database);
	  var myquery = {userid : id};
	  console.log(myquery);
	  dbo.collection('user_permissions').deleteMany(myquery, function(err, obj) {
	    if (err) throw err;
	    console.log(obj.result.n + " document(s) deleted");
	    callback();
	    db.close();
	  });
	});
}

module.exports.searchOne = function(data, model, callback) {

    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		  if (err) throw err;
		  //console.log(data);
		  var dbo = db.db(env.database);
		  var myquery = data;
		  dbo.collection(model).find(myquery).toArray(function(err, result) {
		    if (err) throw err;
		    //console.log(result);
		    callback(result);
		    db.close();

		  });
    });

   
}

module.exports.findById = function(callback, id, model) {
    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		if (err) throw err;
			var dbo = db.db(env.database);
			var myquery = { '_id' : ObjectId(id)}; 
			dbo.collection(model).find(myquery).toArray(function(err, docs) {
			    console.log("Found the following records");
			    console.log(docs);
			    callback(docs);
		    });
    });
}

module.exports.findAll = function(callback,model) {
    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(env.database);
		  dbo.collection(model).find().toArray(function(err, result) {
		    if (err) throw err;
		    callback(result);
		  });
    });
}

module.exports.setPermissions = function(id,permissions) {
    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
        var dbo = db.db(env.database);
		for(i = 0; i < permissions.length; i++) { 
			var myobj = {userid : id, permissionid : permissions[i] };
			dbo.collection('user_permissions').insertOne(myobj, function(err, res) {
			    if (err) throw err;
			    console.log("1 document inserted");
			});
		}
	    db.close();
   });
}

module.exports.getPermissionByUserId = function(callback,id) {
    MongoClient.connect(mongoDbConnectionUrl, function(err, db) {
		if (err) throw err;
			var dbo = db.db(env.database);
			var myquery = { 'userid' : id}; 
			dbo.collection('user_permissions').find(myquery).toArray(function(err, docs) {
			    console.log("Found the following permissions");
			    console.log(docs);
			    callback(docs);
		    });
		});
}
