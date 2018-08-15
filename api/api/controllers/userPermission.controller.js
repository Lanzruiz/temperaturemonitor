var mongoDbConnection = require('../../app').mongoDbConnection;
var util = require('util');
var UserService = require('../../services/user.service');
var UserPermissionService = require('../../services/userPermission.service');
var AppError = require('../../models/appError.model');

class UserPermissionController {
    constructor() {
        this.userService = new UserService();
        this.userPermissionService = new UserPermissionService();
    }

    addPermissionForUser(req,res) {
        try {
            var permissions = req.body;
            var userId = req.swagger.params.userId.value;
            this.userPermissionService.addPermissionForUser(userId,permissions).then( () => {
                return res.status(200).json('User permissions has been added');
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

    updatePermissionForUser(req,res) {
        return res.status(500).json("Not yet implemented");
    }

    listPermissionsForUser(req,res) {
        return res.status(500).json("Not yet implemented");
    }
    
    getPermissionForUser(req,res) {
        return res.status(500).json("Not yet implemented");
    }

    deletePermissionForUser(req,res) {
        return res.status(500).json("Not yet implemented");
    }

    listUserPermissionTypes(req,res) {
        try {
            this.userPermissionService.listUserPermissionTypes().then( (permissionTypes) => {
                return res.status(200).json(permissionTypes);
            }).catch( (error) => {
                if (error instanceof AppError) {
                    return res.status(404).json(
                        {code: error.code, message: "The permission type was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        }  
    }

    getUserPermissionType(req,res) {
        return res.status(500).json("Not yet implemented");
    }
}

//wiring for swagger router
var userPermissionController = new UserPermissionController();
module.exports = {
    addPermissionForUser: function(req, res) { userPermissionController.addPermissionForUser(req, res); },    
    updatePermissionForUser: function(req, res) { userPermissionController.updatePermissionForUser(req, res); },    
    listPermissionsForUser: function(req, res) { userPermissionController.listPermissionsForUser(req, res); },    
    getPermissionForUser: function(req, res) { userPermissionController.getPermissionForUser(req, res); },    
    deletePermissionForUser: function(req, res) { userPermissionController.deletePermissionForUser(req, res); },    
    listUserPermissionTypes: function(req, res) { userPermissionController.listUserPermissionTypes(req, res); },    
    getUserPermissionType: function(req, res) { userPermissionController.getUserPermissionType(req, res); },    
};
