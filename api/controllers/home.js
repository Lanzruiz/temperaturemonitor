var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var userModel = require('../models/user');
var constant = require('../config/constants')
//var trim = require('trim-character');

exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.list = function(req, res) {

   //console.log(req.body.)
   user.getall(res);


}

exports.createnant = function(req, res) {

    res.render('b3/new-tenant.ejs');
}

exports.home = function(req, res) {


	// console.log(trim(req.hostname, '.'+constant.base_url))

	res.render('login.ejs', {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,

	 });

}

exports.mobile = function(req, res) {

    http.get("http://localhost:8100/partners")
            .success(function(response) {
                $scope.firstname = response.firstname;
                $scope.lastname = response.lastname;
            })
            .error(function(response) {
                alert("ERROR");
            });
}


exports.signup = function(req, res) {
	res.render('signup.ejs');

}

exports.createTenants = function(req, res) {

    res.render('tenants/createTenants.ejs');

}
exports.tenantlist = function(req, res) {

     res.render('b3/tenants.ejs');
}

exports.login = function(req, res) {


    //console.log(trim(req.hostname, '.'+constant.base_url))

	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('b3/login.ejs', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}

}
