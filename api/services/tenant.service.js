var MongoDbService = require('./mongodb.service');
var AppError = require('../models/appError.model');
const mongoDb = require('mongodb');
const mongoUuid = require('mongo-uuid');
const uuid = i => mongoUuid(mongoDb.Binary, i);
var clone = require('clone');
var toMongodb = require('jsonpatch-to-mongodb');

module.exports = class TenantService {

    constructor() {    
    }

    addTenant(tenant) {
        tenant = clone(tenant);
        return new Promise(function(resolve, reject) {            
            var nameCheck = this.tenantExistsWithName(tenant.name).then( (exists) => {
                if (exists) {
                    throw new AppError(
                        "When trying to add a new tenant, a tenant with the name '" + tenant.name 
                        + "' already exists", AppError.TENANT_ALREADY_EXISTS);
                }
            });
            var subdomainCheck = this.tenantExistsWithSubdomain(tenant.subdomain).then( (exists) => {
                if (exists) {
                    throw new AppError(
                        "When trying to add a new tenant, a tenant with the subdomain '" + tenant.subdomain 
                        + "' already exists", AppError.TENANT_ALREADY_EXISTS);
                    }
            })            
            Promise.all([nameCheck, subdomainCheck]).then( () => {
                tenant._id = uuid();
                //console.log("generated uuid " + mongoUuid.stringify(tenant._id) + " for the new tenant");                
                //TODO: create postgres database
                return MongoDbService.getDb();
            }).then( (db) => {
                console.assert(db);
                console.assert(tenant.name);
                return db.collection('tenant').insertOne(tenant);
            }).then( () => {
                resolve(mongoUuid.stringify(tenant._id));
            });
        }.bind(this));
    }

    getTenantWithId(tenantId) {
        return new Promise(function(resolve, reject) {
            console.assert(tenantId);                
            MongoDbService.getDb().then( (db) => {
                if (typeof(tenantId) == "string") {                    
                    tenantId = uuid(tenantId);
                }
                return db.collection('tenant').findOne({_id: tenantId});
            }).then( (tenant) => {
                if (tenant) {
                    tenant.id = tenantId;
                    delete tenant._id;
                    return resolve(tenant);
                } else {                
                    throw new AppError("Tenant with id " + tenantId + " not found", AppError.TENANT_NOT_FOUND);
                }
            });
        });
    }

    listTenants(filterSortQuery) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                //TODO: apply filtering and sorting
                return db.collection('tenant').find().sort({$natural:-1}).toArray();
            }).then( (tenants) => {
                for (let i=0; i<tenants.length; ++i) {
                    var tenant = tenants[i];
                    tenant.id = mongoUuid.stringify(tenant._id);
                    delete tenant._id;
                }
                resolve(tenants);
            });
        });        
    }
    
    updateTenant(tenantId,jsonPatch) {
        var tenant_id;
        return new Promise(function(resolve, reject) {
            console.assert(tenantId);
            this.tenantExistsWithId(tenantId).then( (tenantExists) => {
                if (!tenantExists) {
                    throw new AppError("Tenant with id '" + tenantId + "' not found", AppError.TENANT_NOT_FOUND);
                }
                tenant_id = uuid(tenantId);
                return MongoDbService.getDb();
            }).then( (db) => {
                console.assert(db);
                //console.log("about to update an exsting tenant to the db:");
                console.assert(tenant_id);
                return db.collection('tenant').updateOne(
                    { _id: tenant_id}, 
                    toMongodb(jsonPatch)
                );
            }).then( () => {
                return resolve();
            });
        }.bind(this));
    }

    tenantExistsWithProperty(propertyName, propertyValue) {
        var properties = {};
        properties[propertyName] = propertyValue;
        return this.tenantExistsWithProperties(properties);
    }

    tenantExistsWithProperties(properties, all = false) {
        return new Promise(function(resolve, reject) {
            var operator = all ? "and": "$or";
            var query = {};
            query[operator] = [];
            for (var propertyName in properties) {
                var match = {};
                match[propertyName] = properties[propertyName];
                query[operator].push(match);
            }
            //console.log(query);
            MongoDbService.getDb().then( (db) => {
                return db.collection('tenant').findOne(query);
            }).then( (tenant) => {                   
                resolve(tenant != null);
            });
        });
    }

    tenantExistsWithId(id) {
        if (typeof(id) == "string") {                    
            id = uuid(id);
        }
        return this.tenantExistsWithProperty("_id", id);
    }

    tenantExistsWithName(name) {
        return this.tenantExistsWithProperty("name", name);
    }

    tenantExistsWithLegalName(legalName) {
        return this.tenantExistsWithProperty("legalName", legalName);
    }

    tenantExistsWithSubdomain(subdomain) {
        return this.tenantExistsWithProperty("subdomain", subdomain);
    }

    tenantExists(name, legalName, subdomain) {
        return this.tenantExistsWithProperties({
            name: name,
            legalName: legalName,
            subdomain: subdomain
        });
    }

    activateTenant(tenantId) {
        return new Promise(function(resolve, reject) {
            this.getTenantWithId(tenantId).then( (tenant) => {
                if (tenant.status == "active") {
                    throw new AppError("Tenant already active", AppError.TENANT_ALREADY_ACTIVE);
                } else {
                    MongoDbService.getDb().then( (db) => {
                        return db.collection('tenant').updateOne({ _id: tenant.id}, { $set: { status: "active" } });
                    }).then( () => {
                        return resolve();
                    });    
                }
            });
        }.bind(this));
    }

    deactivateTenant(tenantId) {
        return new Promise(function(resolve, reject) {
            this.getTenantWithId(tenantId).then( (tenant) => {
                   if (tenant.status == "deactivated") {
                    throw new AppError("Tenant already deactivated", AppError.TENANT_ALREADY_DEACTIVATED);
                } else {
                    MongoDbService.getDb().then( (db) => {
                        return db.collection('tenant').updateOne({ _id: tenant.id}, { $set: { status: "deactivated" } });
                    }).then( () => {
                        return resolve();
                    });    
                }
            });
        }.bind(this));
    }

    deleteTenantWithName(name) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                return db.collection('tenant').deleteMany({ name: name});
            }).then( () => {
                //console.log('deleted tenant with nane ' + name);
                return resolve();
            });
        });
    }

    deleteTenant(tenantId) {
        return new Promise(function(resolve, reject) {
            MongoDbService.getDb().then( (db) => {
                return db.collection('tenant').deleteMany({ _id: uuid(tenantId)});
            }).then( () => {
                //console.log('deleted tenant with nane ' + name);
                return resolve();
            });
        });
    }

    backUpTenant(tenantId) {
        return new Promise(function(resolve, reject) {
            this.getTenantWithId(tenantId).then( (tenant) => {

                var tool = new pgtools();

                tool.dumpDatabase({
                    host: 'localhost',
                    port: 5432,
                    user: tenant.name,
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
        }.bind(this));

    }
}