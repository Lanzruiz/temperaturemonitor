var path = require('path');
var dotEnvPath = path.resolve('../../.env');
require('dotenv').config({ path: dotEnvPath});
var should = require('should');
var request = require('supertest');
const assert = require('assert');
var TenantTestHelper = require('../helpers/tenantTest.helper');
var tenantService = require('../../services/tenant.service');
var tenantService = new tenantService();

describe('services', function () {
    describe('tenant.service', function () {

        describe('addTenant', function () {
            before(function() {
                return TenantTestHelper.ensureTestTenantDoesntExist("IKEA");
            });
            it('should return a uuid', function () {
                var tenant = {
                    name: "IKEA",
                    legalName: "IKEA Pty Ltd",
                    subdomain: "ikea",
                    status: "active"
                }
                return tenantService.addTenant(tenant).should.eventually.have.lengthOf(36);
            });
            after(function() {
                return TenantTestHelper.ensureTestTenantDoesntExist("IKEA");
            });
        });
        
        describe('updateTenant', function () {
            var tenantId;
            before(function() {
                return new Promise(function(resolve, reject) {
                    TenantTestHelper.ensureTestTenantExists("IKEA").then( (testTenantId) => {
                        tenantId = testTenantId;
                        resolve();
                    });    
                });
            });
            it('should have changed the legalName of the tenant', function() {
                var tenant = {
                    id: tenantId,
                    name: "IKEA",
                    legalName: "IKEA Holdings Pty Ltd",
                    subdomain: "ikea",
                    status: "active"
                }
                return tenantService.updateTenant(tenant).then( () => {
                    return tenantService.getTenantWithId(tenant.id);
                }).then( (tenant) => {
                    tenant.should.have.property('legalName', 'IKEA Holdings Pty Ltd');
                });
            });
            after(function() {
                return TenantTestHelper.ensureTestTenantDoesntExist("IKEA");
            });
        });

        describe('deactivateTenant', function () {
            var tenantId;
            before(function() {
                return new Promise(function(resolve, reject) {
                    TenantTestHelper.ensureTestTenantExists("IKEA").then( (testTenantId) => {
                        tenantId = testTenantId;
                        resolve();
                    });    
                });
            });
            it('should have changed the status of the tenant', function() {
                return tenantService.getTenantWithId(tenantId).then( (tenant) => {
                    return tenantService.deactivateTenant(tenant.id).then( () => {
                        return tenantService.getTenantWithId(tenant.id);                    
                    }).then( (updatedTenant) => {
                        updatedTenant.should.have.property('status', 'deactivated');
                    });
                });
            });
            after(function() {
                return TenantTestHelper.ensureTestTenantDoesntExist("IKEA");
            });
        });

        describe('activateTenant', function () {
            var tenantId;
            before(function() {
                return new Promise(function(resolve, reject) {
                    TenantTestHelper.ensureTestTenantExists("jomocha6@test.com", "Joseph", "Mocha", "deactivated").then( (testTenantId) => {
                        tenantId = testTenantId;
                        resolve();
                    });    
                });
            });
            it('should have changed the status of the tenant', function() {
                return tenantService.getTenantWithId(tenantId).then( (tenant) => {
                    tenant.should.have.property('status', 'deactivated');
                    return tenantService.activateTenant(tenant.id).then( () => {
                        return tenantService.getTenantWithId(tenant.id);                    
                    }).then( (updatedTenant) => {
                        updatedTenant.should.have.property('status', 'active');
                    });
                });
            });
            after(function() {
                return TenantTestHelper.ensureTestTenantDoesntExist("jomocha6@test.com");
            });
        });
        
        describe('listTenants', function () {
            before(function() {
                return new Promise(function(resolve, reject) {
                    Promise.all([
                        TenantTestHelper.ensureTestTenantExists(
                            "IKEA", "IKEA Pty Ltd", "ikea", "deactivated"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Woolworths Supermarkets", "Woolworths Supermarkets Pty Ltd", "woolworths"),
                        TenantTestHelper.ensureTestTenantExists(
                            "NHS Trust", "NHS Trust", "nhstrust"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Ramsay Health", "Ramsay Health Pty Ltd", "ramsay"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Warwick University", "Warwick University Pty Ltd", "warwick", "deactivated"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Iceland", "Iceland Pty Ltd", "iceland")
                    ]).then( (tenantIds) => {
                        resolve();
                    });    
                });
            });
            it('should return the active tenants sorted by name', function() {
                var filterSortQuery = {
                    tenantListFilterQuery: {
                        status: "active"
                    },
                    tenantListSortQuery: {
                        sortBy: "tenant name",
                        order: "ascending"
                    }
                }
                return tenantService.listTenants(filterSortQuery).then( (tenants) => {
                    tenants.should.have.a.lengthOf(4);
                    tenants[0].should.have.property('name', 'Iceland');
                    tenants[1].should.have.property('name', 'NHS Trust');
                    tenants[2].should.have.property('name', 'Ramsay Health');
                    tenants[3].should.have.property('name', 'Woolworths Supermarkets');
                });
            });
            after(function() {
                return Promise.all([
                    TenantTestHelper.ensureTestTenantDoesntExist("IKEA"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Woolworths Supermarkets"),
                    TenantTestHelper.ensureTestTenantDoesntExist("NHS Trust"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Ramsay Health"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Warwick University"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Iceland")
                ]);
            });
        });
        
    });
});
