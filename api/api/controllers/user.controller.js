var mongoDbConnection = require('../../app').mongoDbConnection;
var util = require('util');
var UserService = require('../../services/user.service');
var AppError = require('../../models/appError.model');

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    addUser(req, res) {        
        try {
            var user = req.body;
            this.userService.addUser(user).then( (userId) => {
                return res.status(200).json({userId});
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The user data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.USER_ALREADY_EXISTS) {
                    return res.status(409).json(
                        {code: error.code, message: "The user already exists"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }
    }

    updateUser(req, res) {
        try {
            var userId = req.swagger.params.userId.value;
            var jsonPatch = req.body;
            this.userService.updateUser(userId,jsonPatch).then( () => {
                 console.log('updated user');
                return res.status(200).json("successful operation, user updated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The user data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.USER_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The user was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }
    }

    getUser(req, res) {
        try {
            var userId = req.swagger.params.userId.value;
            console.log("getUser with id '" + userId + "'");
            this.userService.getUserWithId(userId).then( (user) => {
                console.log(user);
                return res.status(200).json(user);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The user was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }        
    }

    listUsers(req, res) {
        try {
            var userFilterSortQuery = req.body;
            this.userService.listUsers(userFilterSortQuery).then( (users) => {
                return res.status(200).json(users);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_LIST_QUERY_INVALID) {
                    return res.status(404).json(
                        {code: error.code, message: "The user was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }        
    }

    activateUser(req, res) {
        try {
            var userId = req.swagger.params.userId.value;
            this.userService.activateUser(userId).then( () => {
                console.log('activated user');
                return res.status(200).send();
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_ALREADY_ACTIVE) {
                    return res.status(400).json(
                        {code: error.code, message: "The user was already active"});
                } else if (error instanceof AppError && error.code == AppError.USER_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The user was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }
    }
    
    deactivateUser(req, res) {
        try {
            var userId = req.swagger.params.userId.value;
            this.userService.deactivateUser(userId).then( () => {
                console.log('deactivated user');
                return res.status(200).send();
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_ALREADY_DEACTIVATED) {
                    return res.status(400).json(
                        {code: error.code, message: "The user was already active"});
                } else if (error instanceof AppError && error.code == AppError.USER_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The user was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json(
                        {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {code: AppError.UNKNOWN, message: "An internal server error has occurred"});            
        }
    }

    loginUser(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    logoutUser(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userDelete2fa(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userNew2faKey(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userActivate2fa(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userVerify2fa(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userPasswordResetSendCodeToEmail(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userPasswordResetCheckCode(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }

    userPasswordResetChangePassword(req,res) {
        return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});            
    }
}

//wiring for swagger router
var userController = new UserController();
module.exports = {
    addUser: function(req, res) { userController.addUser(req, res); },
    updateUser: function(req, res) { userController.updateUser(req, res); },
    getUser: function(req, res) { userController.getUser(req, res); },
    listUsers: function(req, res) { userController.listUsers(req, res); },
    activateUser: function(req, res) { userController.activateUser(req, res); },
    deactivateUser: function(req, res) { userController.deactivateUser(req, res); },
    loginUser: function(req, res) { userController.loginUser(req, res); },
    logoutUser: function(req, res) { userController.logoutUser(req, res); },
    userDelete2fa: function(req, res) { userController.userDelete2fa(req, res); },
    userNew2faKey: function(req, res) { userController.userNew2faKey(req, res); },
    userActivate2fa: function(req, res) { userController.userActivate2fa(req, res); },
    userVerify2fa: function(req, res) { userController.userVerify2fa(req, res); },
    userPasswordResetSendCodeToEmail: function(req, res) { userController.userVerify2fa(req, res); },
    userPasswordResetCheckCode: function(req, res) { userController.userPasswordResetCheckCode(req, res); },
    userPasswordResetChangePassword: function(req, res) { userController.userPasswordResetChangePassword(req, res); },
};
