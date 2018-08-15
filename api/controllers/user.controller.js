
var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var userModel = require('../models/user');
var auth = require('../config/auth')
var database = require('../config/database')
var mongoose = require('mongoose');
var auth = require('basic-auth');

module.exports = class UserController {

    add(req, res) {
        try {            
            var user = new userModel(
                req.body.email,
                req.body.password,
                req.body.role,
                req.body.mobile,
                req.body.profilePic,
                req.body.firstname,
                req.body.lastname,
            );
            if (req.body.access_token == auth.access_token) {
                console.log(req.body.permissions);
                //console.log(tenant.find('company', req.body.company));

                //if(user.find('email', req.body.email) != true) {
                user.add(req.body.permissions);
                res.status(200).send('data has been saved!');

                // }else {
                //   res.status(302).send('duplicate!');
                // }  

            } else {
                res.status(403).send('Access Denied!');
            }

        } catch (err) {
            console.log(err);
            return res.status(400).json({status: 400, message: err.message});
        }    
    }

    login(req, res) {

        // reference https://gist.github.com/charlesdaniel/1686663

        var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
        console.log("Authorization Header is: ", auth);

        if (!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

            // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
            // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

            res.end('<html><body>Need some creds son</body></html>');
        }

        else if (auth) {    // The Authorization was passed in so now we validate it

            var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

            var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
            var plain_auth = buf.toString();        // read it back out as a string

            console.log("Decoded Authorization ", plain_auth);

            // At this point plain_auth = "username:password"

            var creds = plain_auth.split(':');      // split on a ':'
            var username = creds[0];
            var password = creds[1];

            if ((username == 'staff@monika.com') && (password == 'enter123>run>child')) {   // Is the username/password correct?

                res.statusCode = 200;  // OK
                return res.json(200, {

                    access_token: auth,
                    permissions: 1

                });
            } else if ((username == 'owner@company.com') && (password == 'enter123>run>child')) {
                res.statusCode = 200;  // OK
                return res.json(200, {

                    access_token: auth,
                    permissions: 2

                });
            }
            else {
                res.statusCode = 401; // Force them to retry authentication
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                // res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

                res.end('<html><body>You shall not pass</body></html>');
            }
        }
    }

    list(req, res) {

        var access = req.param("access_token");
        console.log("token from url " + access);
        console.log("token from auth " + auth.access_token);
        console.log(access);
        if (access == auth.access_token) {
            var user = new userModel();
            console.log(req.param("access_token"));

            user.findAll(function (data) {
                res.status(200).send(data);
            });
        } else {
            res.status(403).send('Access Denied!');
        }
    }

    get(req, res) {
        var id = req.param("id");
        //  console.log("token from url "+access);
        //  console.log("token from auth " +auth.access_token);
        // if( access == auth.access_token) {
        var user = new userModel();
        user.find(id, function (data) {
            res.status(200).send(data);
        });
        //        })
        // } else {
        //   res.status(403).send('Access Denied!');
        // } 
    }

    setPermission(req, res) {
        var id = req.param("id");
        var user = new userModel();
        user.setPermission(id, req.body.permissions);
        res.status(200).send('permissions updated');
    }

    page(req, res) {
       res.render('login.ejs');
    }
}







