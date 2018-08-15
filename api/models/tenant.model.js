var database = require('../config/database')
var database = require('../lib/mongoose')
var mongoclient = require('../lib/mongodb')
var bcrypt = require('../lib/bcrypt')


class Tenant {
  
  constructor(company, subdomain, email, contact, address, password) {
    this._company = company;
    this._subdomain = subdomain;
    this._email = email;
    this._contact = contact;
    this._address = address;
    this._password = password;
    this._model = "tenants";
  }

  add() {

    var myobj = { 
        company: this._company, 
        subdomain: this._subdomain, 
        email: this._email, 
        contact: this._contact, 
        address: this._address,
        password: bcrypt.generateHash(this._password),
        status: 0
    };

    mongoclient.save(myobj, this._model);
  }

  activate() {

    var myobj = { 
        company: this._company, 
        status: 1
    };

     mongoclient.update(myobj,this._model);
  }

  deactivate() {

    var myobj = { 
        company: this._company, 
        status: 0
    };

     mongoclient.update(myobj,this._model);
  }

  edit() {

    var myobj = { 
        company: this._company, 
        subdomain: this._subdomain, 
        email: this._email, 
        contact: this._contact, 
        address: this._address
    };

     mongoclient.update(myobj,this._model);
  }

  delete() {

  }

  
  findById(id, callback) {
      mongoclient.findById(function(data) {
            if(data)
              callback(data[0]);
      },id,this._model);
  }
  
  find(element, data) {

    var headsup;

      switch (element) {

        case 'company':
            
            var myobj = { 
                company: data
            };
            headsup = mongoclient.searchOne(myobj,this._model);

            break;

        case 'subdomain':

            break;

        case 'category':

            var myobj = { 
              email: this._email
            };

            var email = this._email;
            
           mongoclient.searchOne(myobj, this._model, function(result){
              //console.log(myobj);
              callback(result.category)
            });
           break;   

        case 'email':

            var myobj = { 
              email: this._email
            };

            var email = this._email;

            mongoclient.searchOne(myobj, this._model, function(result){
              //console.log(myobj);
              if(result[0].email == email){
                callback(true);
              } else {
                callback(false);
              }
            });

            

          break;

        case 'password':

           var myobj = { 
                email: this._email
            };

            var password =  this._password;

            mongoclient.searchOne(myobj, this._model, function(result){
               console.log(result[0].password);
              bcrypt.comparePassword(password, result[0].password, function(res){
                 callback(res);
              });
            });

          // bcrypt.comparePassword(myobj, mongoclient.searchOne('password',this._model, function(res){
          //   console.log(res);
          // }));

          break;
        
    }     
  }

  findAll(callback) {

    mongoclient.findAll(function(data) {
        callback(data);
    },this._model);
  }
}


module.exports = Tenant;






