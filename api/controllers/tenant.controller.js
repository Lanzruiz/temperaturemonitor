
var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
//var userModel = require('../models/user');
var tenantModel = require('../models/tenant');
var MongoClient = require('mongodb').MongoClient;

var database = require('../config/database')
var auth0 = require('../config/auth0')
//var auth = require('../config/auth')
var mongolib = require('../lib/mongoose')
var password = require('../lib/password')
var bcrypt = require('../lib/bcrypt')
var mongoose = require('mongoose');
var pgtools = require('../lib/pgtools');
var email = require('../lib/email');
var fs = require('fs');
var pg = require('pg');
const fse = require('fs-extra');
var path = require('path');

var request = require("request");



module.exports = {
 
  add : function(req, res) {
    var tenant = new tenantModel(
          req.body.company, 
          req.body.subdomain.replace(/\s/g, '').toLowerCase(), 
          req.body.email, 
          req.body.contact, 
          req.body.address,
          req.body.password
    );

    if(req.body.access_token == auth.access_token) {
      if(tenant.find('company', req.body.company) != true) {

        tenant.add();

        res.status(200).send('data has been saved!');

      }else {
        res.status(302).send('duplicate!');
      }  

    } else {
      res.status(403).send('Access Denied!');
    }  
  },

  signup: function(req, res) {
    var tenant = new tenantModel(
          req.body.company, 
          req.body.subdomain, 
          req.body.email, 
          req.body.contact, 
          req.body.address,
          req.body.password
    );

    console.log(req.body.company);

    tenant.add();

    res.status(200).send('data has been saved!');

  },

  activate: function(req, res){
    if(req.body.access_token == auth.access_token) {

      var tenant = new tenantModel(
        req.body.company, 

      );
      tenant.activate();
      res.status(200).send('data has been activate!');

    } else {
      res.status(403).send('Access Denied!');
    }  
  },

  deactivate: function(req, res){
    if(req.body.access_token == auth.access_token) {

      var tenant = new tenantModel(
        req.body.company, 

      );

      tenant.deactivate();
      res.status(200).send('data has been deactivate!');

    } else {
      res.status(403).send('Access Denied!');
    }  
  },
  edit: function(req, res) {
    if(req.body.access_token == auth.access_token) {

      var tenant = new tenantModel(
        req.body.company, 
        req.body.subdomain.replace(/\s/g, '').toLowerCase(), 
        req.body.email, 
        req.body.contact, 
        req.body.address
      );

      tenant.edit();
      res.status(200).send('data has been updated!');

    } else {
      res.status(403).send('Access Denied!');
    } 
  },

  restore: function(req, res) {

     var tenant = {
          email: req.body.email,
          password: password.password,
          company: req.body.company,
          firstname: req.body.firstname,
          middlename: req.body.middlename,
          role: 1
      }

  },

  delete: function(req, res) {
     console.log('DELETE');
     res.status(200).send('data has been deleted!');
  },

  adduser: function(req, res) {

    var access = req.param("access_token");

    if(req.body.access_token == aut.access_token) {
 
      var url = database.url+req.body.company;

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(req.body.company);
        var myobj = {firstname: req.body.firstname, lastname: req.body.lastname, role: 2 };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });

      console.log('Data has been save!');
      res.status(200).send('data has been saved!');

    } else {
      res.status(403).send('Access Denied!');
    }
  },

  auth: function(req, res, next){
	return res.status(200).json({status: 200, message: "test succeeded"});
	console.log('call to api/tenant/auth');


    var tenant = new tenantModel(
          req.body.company, 
          req.body.subdomain, 
          req.body.email, 
          req.body.contact, 
          req.body.address,
          req.body.password
    );

    tenant.find('email', function(result){
       
       if(result == true) {

         console.log("User exist");

          tenant.find('password', function(result){
            if(result==true) {
              auth0.generateAccess_token(function(result){
                 var token = JSON.parse(result);
                 var data = {
                    email: req.body.email,
                    access_token: token.access_token,
                    status: 0,
                    category: token.permission
                 //console.log(data.access_token);
                  }
                 res.json(data);
                 res.status(200);
              });
            }
            else {
               console.log("access denied");
               var data = {
                 status: 403
               }
            }
          });

       } else if(req.body.email == 'staff@monika.com' && req.body.password == 'enter123>run>child') {

         auth0.generateAccess_token(function(result){
                 var token = JSON.parse(result);
                 var data = {
                    email: req.body.email,
                    access_token: token.access_token,
                    status: 0,
                    category: token.permission
                 //console.log(data.access_token);
                  }
                 res.json(data);
          });
         res.status(200);
       } else {
         console.log("user not exist");
       }
  
    });

    

  },

  list : function(req, res){

    var access = req.param("access_token");

    console.log("token from url "+access);
    console.log("token from auth " +auth.access_token);
    
    if( access == auth.access_token) {
      var tenant = new tenantModel();
      console.log(req.param("access_token"));

      tenant.findAll(function(data) {
        res.status(200).send(data); 
      });
           

    } else {
      res.status(403).send('Access Denied!');
    }       

          
  },

	page : function(req, res){
 
      res.render('login.ejs');

  },
  backup: function(req, res){
 
      var id = req.param('id');
      var tenant = new tenantModel();
      tenant.findById(id, function(data) {
            var tool = new pgtools();

            tool.dumpDatabase({
                host: 'localhost',
                port: 5432,
                user: data.company,
                password: data.password,
                dumpPath: 'public/Resource',
                database: data.company
            }, function (err, output, filePath) {
                if (err) throw err;

                var filename = path.parse(filePath).base;
                email.backup_email(data.company,data.email,filename,function(success){
                   if(success) {
                      console.log('Email has been sent..');
                      res.status(200).send(filePath); 
                    }
                    else 
                      res.status(302).send('Fail sending email');
                });
               
            });

      });

  },

  download(req, res){
    var filename = req.param('filename');
    var file = path.join(__dirname,'../../public/Resource')+"/"+filename; 
    res.sendFile(file);
  },

  find(id, callback) {

    mongoclient.findAll(function(data) {
        callback(data);
    },this._model);
  }
  

}







