var MongoDbService = require('./mongodb.service');
var AppError = require('../models/appError.model');
const mongoDb = require('mongodb');
const mongoUuid = require('mongo-uuid');
const uuid = i => mongoUuid(mongoDb.Binary, i);
var UserService = require('./user.service');
module.exports = class UserPermissionService {

    constructor() {
    	this.userService = new UserService();

    }

    addPermissionForUser(userId, permissions) {
        //user = clone(user);

        console.log(userId);
        console.log(permissions,"-------");
        return new Promise(function(resolve, reject) {
        	 console.log(userId);
        console.log(permissions,"-------");
            this.userService.userExistsWithId(userId).then( (userExists) => {
                if (!userExists) {
                    throw new AppError("User with id '" + userId+ "' not found", AppError.USER_NOT_FOUND);
                }
                // user._id = uuid(user.id);
                // delete user.id;
                return MongoDbService.getDb();
            }).then( (db) => {
                //console.log("about add a new user to the db:");
                for (let permission of permissions) {
                	let data = {
                		permissionTypeId : permission.permissionTypeId,
                		userId : userId,
                		tenantId : permission.tenantId,
                		regionId : permission.regionId,
                		siteId : permission.siteId
                	}
     				db.collection('user_permission').insertOne(data);
     			}
                return resolve();
            });
        }.bind(this));
    }

	listUserPermissionTypes() {
		return new Promise(function(resolve, reject) {
	           let type = [
	           		{
	           			'id': "fa8518a0-89df-11e8-9a94-a6cf71072f63" ,
				  	 	'name' : 'Tenant Management',
				  	 	'description': 'This permission is allows the user account to create, delete and manage tenants. This permission is only intended to be granted to certain Monika Staff.',
				  	 	'tenantScope': false,
				  	 	'regionScope': false,
				  	 	'siteScope': false
	           		}
	           		,
	           		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f62" ,
				  	 	'name' : 'Enterprise Reporting',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': false
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f17" ,
				  	 	'name' : 'Site Reporting',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f16" ,
				  	 	'name' : 'Recieve Escalated Non-Compliances',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
					{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f15" ,
				  	 	'name' : 'Case Reporting',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f14" ,
				  	 	'name' : 'Policy Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f13" ,
				  	 	'name' : 'Equipment Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f12" ,
				  	 	'name' : 'Site Definition',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},

		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f11" ,
				  	 	'name' : 'Site Configuration',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},

				  	{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f43" ,
				  	 	'name' : 'User Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f42" ,
				  	 	'name' : 'Food Type Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f41" ,
				  	 	'name' : 'Process Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f33" ,
				  	 	'name' : 'Incedent Recording',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': false
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f32" ,
				  	 	'name' : 'Incedent Management',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f31" ,
				  	 	'name' : 'Audit Inspection',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f23" ,
				  	 	'name' : 'Audit Response',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},
		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f22" ,
				  	 	'name' : 'Task Configuration and  Scheduling',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		},

		  	   		{
				  		'id': "fa8518a0-89df-11e8-9a94-a6cf71072f21" ,
				  	 	'name' : 'Work on Task',
				  	 	'description': '',
				  	 	'tenantScope': true,
				  	 	'regionScope': true,
				  	 	'siteScope': true
		  	   		}
		  	   	];

			      
			    resolve(type);
              });
    }
    
}