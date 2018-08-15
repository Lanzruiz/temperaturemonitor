var TenantService = require('../../services/tenant.service');
var tenantService = new TenantService();

class TenantTestHelper {
    ensureTestTenantDoesntExist(name) {
        return new Promise( (resolve, reject) => {                            
            tenantService.tenantExistsWithName(name).then( (tenantExists) => {
                if (tenantExists) {
                    return tenantService.deleteTenantWithName(name).then( () => {
                        resolve();
                    })
                } else {
                    resolve();
                }
            }).catch( (error) => {
                console.log("error when calling ensureTestTenantDoesntExist");
                console.log(error);
                throw error;
            });
        });
    }

    ensureTestTenantExists(name = "IKEA", legalName = "IKEA Pty Ltd", subdomain = "ikea", status = "active") {
        return new Promise( (resolve, reject) => {                            
            tenantService.tenantExistsWithName(name).then( (tenantExists) => {                
                if (!tenantExists) {
                    var tenant = {
                        name: name,
                        legalName: legalName,
                        sundomain: subdomain,
                        status: status,
                    };
                    tenantService.addTenant(tenant).then( (tenantId) => {
                        resolve(tenantId);
                    });
                } else {
                    tenantService.getTenantWithName(name).then( (tenant) => {
                        return resolve(tenant.id);
                    });
                }
            }).catch( (error) => {
                console.log(error)
                throw error;
            });
        });
    }
}

var tenantTestHelper = new TenantTestHelper();
module.exports = {
    ensureTestTenantDoesntExist: function(name) { 
        return tenantTestHelper.ensureTestTenantDoesntExist(name); },
    ensureTestTenantExists: function(name, legalName, subdomain, status) { 
        return tenantTestHelper.ensureTestTenantExists(name, legalName, subdomain, status); },
}