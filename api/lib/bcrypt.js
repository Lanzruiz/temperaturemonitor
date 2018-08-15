var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);


module.exports.generateHash = function(password) {

    return bcrypt.hashSync(password, 8);

};


module.exports.comparePassword = function(password, hashPassword, callback) {

	bcrypt.compare(password, hashPassword, function(err, res) {
      callback(res);
    });
}
