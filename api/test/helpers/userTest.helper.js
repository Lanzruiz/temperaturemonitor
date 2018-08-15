var UserService = require('../../services/user.service');
var userService = new UserService();

class UserTestHelper {
    ensureTestUserDoesntExist(emailAddress) {
        return new Promise( (resolve, reject) => {                            
            userService.userExistsWithEmailAddress(emailAddress).then( (userExists) => {
                if (userExists) {
                    userService.deleteUserWithEmailAddress(emailAddress).then( () => {
                        resolve();
                    })
                } else {
                    resolve();
                }
            });
        });
    }

    ensureTestUserExists(emailAddress = "jomocha@test.com", firstName = "Joe", lastName = "Mocha", status = "active") {
        return new Promise( (resolve, reject) => {                            
            userService.userExistsWithEmailAddress(emailAddress).then( (userExists) => {                
                if (!userExists) {
                    var user = {
                        firstName: firstName,
                        lastName: lastName,
                        email: emailAddress,
                        password: "b2#testpassmochaonly",
                        phone: "+447879123456",
                        status: status,
                        companyName: "Monika",
                        ownership: {
                            ownershipType: "monika"
                        }
                    };
                    userService.addUser(user).then( (userId) => {
                        resolve(userId);
                    });
                } else {
                    userService.getUserWithEmailAddress(emailAddress).then( (user) => {
                        return resolve(user.id);
                    });
                }
            });
        });
    }
}

var userTestHelper = new UserTestHelper();
module.exports = {
    ensureTestUserDoesntExist: function(emailAddress) { 
        return userTestHelper.ensureTestUserDoesntExist(emailAddress); },
    ensureTestUserExists: function(emailAddress, firstName, lastName, status) { 
        return userTestHelper.ensureTestUserExists(emailAddress, firstName, lastName, status); },
}