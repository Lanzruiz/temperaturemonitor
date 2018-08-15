var path = require('path');
var dotEnvPath = path.resolve('../../../.env');
require('dotenv').config({ path: dotEnvPath});
var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const assert = require('assert');
var TenantTestHelper = require('../../helpers/tenantTest.helper');
var TenantService = require('../../../services/tenant.service');
var tenantService = new TenantService();

describe('controllers', function () {
    describe('tenant.controller', function () {
        describe('POST /api/v1/tenant/list', function () {
            before(function() {
                return new Promise(function(resolve, reject) {
                    Promise.all([
                        TenantTestHelper.ensureTestTenantExists(
                            "Test IKEA", "IKEA Pty Ltd", "testikea", "deactivated"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Test Woolworths Supermarkets", "Woolworths Supermarkets Pty Ltd", "testwoolworths"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Test NHS Trust", "NHS Trust", "testnhstrust"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Test Ramsay Health", "Ramsay Health Pty Ltd", "testramsay"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Test Warwick University", "Warwick University Pty Ltd", "testwarwick", "deactivated"),
                        TenantTestHelper.ensureTestTenantExists(
                            "Test Iceland", "Iceland Pty Ltd", "testiceland")
                    ]).then( (tenantIds) => {
                        resolve();
                    });    
                });
            });
            it('should return the active tenants sorted by name', function() {
                request(server)
                .post('/api/v1/tenant/list')
                .send({
                    tenantListFilterQuery: {
                        status: "active"
                    },
                    tenantListSortQuery: {
                        sortBy: "tenant name",
                        order: "ascending"
                    }
                })  
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.should.have.a.lengthOf(4);
                    res.body[0].should.have.property('name', 'Test Iceland');
                    res.body[1].should.have.property('name', 'Test NHS Trust');
                    res.body[2].should.have.property('name', 'Test Ramsay Health');
                    res.body[3].should.have.property('name', 'Test Woolworths Supermarkets');
                    done();
                });

            });
            after(function() {
                return Promise.all([
                    TenantTestHelper.ensureTestTenantDoesntExist("Test IKEA"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Test Woolworths Supermarkets"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Test NHS Trust"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Test Ramsay Health"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Test Warwick University"),
                    TenantTestHelper.ensureTestTenantDoesntExist("Test Iceland")
                ]);
            });
        });

    });
});
