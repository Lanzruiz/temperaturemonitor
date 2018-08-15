var MongoDbService = require('./mongodb.service');
var AppError = require('../models/appError.model');
var TenantService = require('./tenant.service');
const mongoDb = require('mongodb');
const mongoUuid = require('mongo-uuid');
const uuid = i => mongoUuid(mongoDb.Binary, i);
var clone = require('clone');
var toMongodb = require('jsonpatch-to-mongodb');

module.exports = class UserService {

    constructor() {
        this.tenantService = new TenantService();
    }

    addUser(user) {
        user = clone(user);
        return new Promise(function(resolve, reject) {
            this.userExistsWithEmailAddress(user.email).then( (userExists) => {
                if (userExists) {
                    throw new AppError("When trying to add a new user, a user with that email address already exists", AppError.USER_ALREADY_EXISTS);
                }
                user._id = uuid();
                //console.log("generated uuid " + mongoUuid.stringify(user.id) + " for the new user");
                return MongoDbService.getDb();
            }).then( (db) => {
                //console.log("about add a new user to the db:");
                console.assert(user.email);
                return db.collection('user').insertOne(user);
            }).then( () => {
                //console.log("new user added");
                resolve(mongoUuid.stringify(user._id));
            });
        }.bind(this));
    }

    getUserWithId(userId) {
        //console.log("getUserWithId [" + userId + "]");
        return new Promise(function(resolve, reject) {
            console.assert(userId);                
            MongoDbService.getDb().then( (db) => {
                if (typeof(userId) == "string") {                    
                    userId = uuid(userId);
                }
                return db.collection('user').findOne({_id: userId});
            }).then( (user) => {
                if (user) {
                    user.id = userId;
                    delete user._id;
                    return resolve(user);
                } else {                
                    throw new AppError("User with id " + userId + " not found", AppError.USER_NOT_FOUND);
                }
            });
        });
    }

    getUserWithEmailAddress(emailAddress) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                return db.collection('user').findOne({email: emailAddress});
            }).then( (user) => {
                if (user) {
                    user.id = mongoUuid.stringify(user._id);
                    delete user._id;
                    return resolve(user);
                } else {
                    throw new AppError("User with email address '" + emailAddress + "' not found", AppError.USER_NOT_FOUND);
                }
            });
        });
    }

    listUsers(filterSortQuery) {       
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                //TODO: apply filtering and sorting
                return db.collection('user').find().sort({$natural:-1}).toArray();
            }).then( (users) => {
                var fillOutOwnershipDetailsPromises = [];
                for (let i=0; i<users.length; ++i) {
                    var user = users[i];
                    user.id = mongoUuid.stringify(user._id);
                    delete user._id;                    
                    fillOutOwnershipDetailsPromises.push(this._fillOutOwnershipDetails(user));
                }
                Promise.all(fillOutOwnershipDetailsPromises).then( () => { 
                    resolve(users);
                });
            });
        }.bind(this));        
    }

    /**
     * We want to add some further information to the ownership details so that when the user
     * is displayed in a list, it can efficiently and easily render that user rather than 
     * making another API call to retreive it.
     * @param {user} user 
     */
    _fillOutOwnershipDetails(user) {
        return new Promise(function(resolve, reject) {
            var ownership = user.ownership;
            if (ownership.ownershipType == 'monika' || ownership.ownershipType == "none") {
                return resolve();
            }
            //var promises = [];
            // if (ownership.tenantId) {                            
            //     promises.push(new Promise(function(resolve, reject) {
            //         this.tenantService.getTenantWithId(ownership.tenantId).then( (tenant) => {
            //             ownership.tenantName = tenant.name;
            //             resolve();
            //         });    
            //     }));
            //     if (ownership.regionId) {
            //         promises.push(new Promise(function(resolve, reject) {
            //             this.regionService.getRegionWithId(ownership.regionId).then( (region) => {
            //                 ownership.regionName = region.name;
            //             });
            //         }));
            //         if (ownership.siteId) {
            //             promises.push(new Promise(function(resolve, reject) {
            //                 this.siteService.getSiteWithId(ownership.siteId).then( (site) => {
            //                     ownership.siteName = site.name;
            //                 });
            //             }));
            //         }
            //     }
            // }
            //return Promise.all(promises);
            return resolve();
        });
    }
    
    updateUser(userId,jsonPatch)  {
        //user = clone(user);
        var user_id;
        return new Promise(function(resolve, reject) {
            //console.assert(user.id);
            this.userExistsWithId(userId).then( (userExists) => {
                if (!userExists) {
                    throw new AppError("User with id '" + userId + "' not found", AppError.USER_NOT_FOUND);
                }
                user_id = uuid(userId);
               // delete user.id;
                return MongoDbService.getDb();
            }).then( (db) => {
                console.assert(db);
                //console.log("about to update an exsting user to the db:");
                //console.assert(user.email);
                return db.collection('user').updateOne(
                    { _id: user_id}, 
                    toMongodb(jsonPatch)
                );
            }).then( () => {
                return resolve();
            });
        }.bind(this));
    }

    userExistsWithEmailAddress(emailAddress) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                return db.collection('user').findOne({ email: emailAddress })
            }).then( (user) => {
                resolve(user != null);
            });
        });
    }

    userExistsWithId(id) {
        return new Promise(function(resolve, reject) {
            this.getUserWithId(id).then( () => {
                return resolve(true);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.USER_NOT_FOUND) {
                    return resolve(false);
                }
                throw error;
            });
        }.bind(this));
    }

    activateUser(userId) {
        return new Promise(function(resolve, reject) {
            this.getUserWithId(userId).then( (user) => {
                if (user.status == "active") {
                    throw new AppError("User already active", AppError.USER_ALREADY_ACTIVE);
                } else {
                    MongoDbService.getDb().then( (db) => {
                        return db.collection('user').updateOne({ _id: user.id}, { $set: { status: "active" } });
                    }).then( () => {
                        return resolve();
                    });    
                }
            });
        }.bind(this));
    }

    deactivateUser(userId) {
        return new Promise(function(resolve, reject) {
            this.getUserWithId(userId).then( (user) => {
                if (user.status == "deactivated") {
                    throw new AppError("User already deactivated", AppError.USER_ALREADY_DEACTIVATED);
                } else {
                    MongoDbService.getDb().then( (db) => {
                        return db.collection('user').updateOne({ _id: user.id}, { $set: { status: "deactivated" } });
                    }).then( () => {
                        return resolve();
                    });    
                }
            });
        }.bind(this));
    }

    deleteUserWithEmailAddress(emailAddress) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                return db.collection('user').deleteMany({ email: emailAddress});
            }).then( () => {
                return resolve();
            });
        });
    }

    _getUserQuery() {
        return {
            $lookup: {
                from: 'tenant',
                localField: 'ownership.tenantId',
                foreignField: 'id',
                as: 'ownership.tenant'
            },
            $unwind: "ownership.tenant",
            $project: {
                "id": true,
                "firstName": true,
                "lastName": true,
                "email": true,
                "phone": true,
                "status": true,
                "companyName": true,
                "ownership.ownershipType": true,
                "ownership.tenantId": true,
                "ownership.tenantName": "ownership.tenant.name",
                "ownership.regionId": true,
                "ownership.siteId": true,
                "created": true,
                "lastModified": true
            }
        }
    }

    /**
     * translates a filter query from the REST API into MongoDB format
     * @param {object} filterQuery 
     */
    _translateFilterQuery(filterQuery) {
        var mongoDbFilterQuery = {};
        for (var item in filterQuery) {
            if (filterQuery.hasOwnProperty(item)) {
                mongoDbFilterQuery[item] = filterQuery[item];
            }
        }
        return mongoDbFilterQuery;
    }

    /**
     * translates a sort query from the REST API into MongoDB format
     * @param {object} sortQuery 
     */
    _translateSortQuery(sortQuery) {
        var ascending = (sortQuery.order == "ascending");        
        switch (sortQuery.sortBy) {
            case "tenant name":

        }

        var mongoDbSortQuery = {

            
        };
        
        return sortQuery
    }
    
}