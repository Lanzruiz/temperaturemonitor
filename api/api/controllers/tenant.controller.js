var mongoDbConnection = require('../../app').mongoDbConnection;
var util = require('util');
var TenantService = require('../../services/tenant.service');
var AppError = require('../../models/appError.model');

class TenantController {
    constructor() {
        this.tenantService = new TenantService();
    }

    addTenant(req, res) {
        try {
            console.log(req.body.profilePic);
            var tenant = req.body;
            this.tenantService.addTenant(tenant).then( (tenantId) => {
                console.log('added tenant');
                return res.status(200).json({tenantId});
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The tenant data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.TENANT_ALREADY_EXISTS) {
                    return res.status(409).json(
                        {code: error.code, message: "The tenant already exists"});
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

    updateTenant(req, res) {
        try {
            console.log(req.swagger.params.tenantId.value);
            var tenantId = req.swagger.params.tenantId.value;
            console.log(req.body);
            var jsonPatch = req.body;
            this.tenantService.updateTenant(tenantId,jsonPatch).then( () => {
                console.log('updated tenant');
                return res.status(200).json("successful operation, tenant updated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The tenant data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.TENANT_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    listTenants(req, res) {
        try {
            var tenantFilterSortQuery = req.body.tenantListSortQuery;
            this.tenantService.listTenants(tenantFilterSortQuery).then( (tenants) => {
                return res.status(200).json(tenants);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_LIST_QUERY_INVALID) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    getTenant(req, res) {
        try {
            var tenantId = req.swagger.params.tenantId.value;
            console.log("getTenant with id '" + tenantId + "'");
            this.tenantService.getTenantWithId(tenantId).then( (tenant) => {
                console.log(tenant);
                return res.status(200).json(tenant);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    deleteTenant(req, res) {
         try {
            var tenantId = req.swagger.params.tenantId.value;
            this.tenantService.deleteTenant(tenantId).then( () => {
                console.log('Tenant deleted');
                return res.status(200).json("successful operation, tenant deleted");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    activateTenant(req, res) {
        try {
            var tenantId = req.swagger.params.tenantId.value;
            this.tenantService.activateTenant(tenantId).then( () => {
                console.log('activated tenant');
                return res.status(200).json("successful operation, tenant activated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_ALREADY_ACTIVE) {
                    return res.status(400).json(
                        {code: error.code, message: "The tenant was already active"});
                } else if (error instanceof AppError && error.code == AppError.TENANT_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    deactivateTenant(req, res) {
        try {
            var tenantId = req.swagger.params.tenantId.value;
            this.tenantService.deactivateTenant(tenantId).then( () => {
                console.log('deactivated tenant');
                return res.status(200).json("successful operation, tenant deactivated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_ALREADY_DEACTIVATED) {
                    return res.status(400).json(
                        {code: error.code, message: "The tenant was already not active"});
                } else if (error instanceof AppError && error.code == AppError.TENANT_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    backupTenant(req, res) {
        try {
             var tenantId = req.swagger.params.tenantId.value;
             this.tenantService.backUpTenant(tenantId).then( (location) => {
                return res.status(201).json(location);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.TENANT_LIST_QUERY_INVALID) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
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

    getBackupJobs(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    getBackupJob(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    deleteBackupJob(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    updateBackupJobSetNotificationEmailAddresses(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    downloadCompletedBackupFile(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    restoreTenantFromUploadedFile(req, res) {
        return res.status(500).json("Not yet implemented");
    }

    restoreTenantFromURL(req, res) {
        return res.status(500).json("Not yet implemented");
    }
}

//wiring for swagger router
var tenantController = new TenantController();
module.exports = {
    addTenant: function(req, res) { tenantController.addTenant(req, res); },    
    updateTenant: function(req, res) { tenantController.updateTenant(req, res); },    
    listTenants: function(req, res) { tenantController.listTenants(req, res); },    
    getTenant: function(req, res) { tenantController.getTenant(req, res); },    
    deleteTenant: function(req, res) { tenantController.deleteTenant(req, res); },    
    activateTenant: function(req, res) { tenantController.activateTenant(req, res); },    
    deactivateTenant: function(req, res) { tenantController.deactivateTenant(req, res); },    
    backupTenant: function(req, res) { tenantController.backupTenant(req, res); },    
    getBackupJobs: function(req, res) { tenantController.getBackupJobs(req, res); },    
    getBackupJob: function(req, res) { tenantController.getBackupJob(req, res); },    
    deleteBackupJob: function(req, res) { tenantController.deleteBackupJob(req, res); },    
    updateBackupJobSetNotificationEmailAddresses: function(req, res) { tenantController.updateBackupJobSetNotificationEmailAddresses(req, res); },    
    downloadCompletedBackupFile: function(req, res) { tenantController.downloadCompletedBackupFile(req, res); },    
    restoreTenantFromUploadedFile: function(req, res) { tenantController.restoreTenantFromUploadedFile(req, res); },    
    restoreTenantFromURL: function(req, res) { tenantController.restoreTenantFromURL(req, res); },    
};

