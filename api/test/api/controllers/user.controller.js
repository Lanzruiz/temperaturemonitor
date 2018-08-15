var path = require('path');
var dotEnvPath = path.resolve('../../../.env');
require('dotenv').config({ path: dotEnvPath});
var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const assert = require('assert');
var UserTestHelper = require('../../helpers/userTest.helper');
var UserService = require('../../../services/user.service');
var userService = new UserService();

describe('controllers', function () {
    describe('user.controller', function () {

        describe('POST /api/v1/user', function () {
            before(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha@test.com");
            });
            it('should return a uuid', function (done) {
                request(server)
                .post('/api/v1/user')
                .send({
                    firstName: "Joe",
                    lastName: "Mocha",
                    email: "jomocha@test.com",
                    password: "b2#testpassmochaonly",
                    phone: "+447879123456",
                    status: "active",
                    companyName: "Monika",
                    ownership: {
                        ownershipType: "monika"
                    }
                })  
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.body.userId.length.should.equal(36);
                    done();
                });
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha@test.com");
            });
        });
        
        describe('PUT /api/v1/user', function () {
            var userId;
            before(function() {
                return new Promise(function(resolve, reject) {
                    UserTestHelper.ensureTestUserExists("jomocha2@test.com").then( (testUserId) => {
                        userId = testUserId;
                        resolve();
                    });    
                });
            }.bind(userId));
            it('should return a 200 response', function (done) {
                request(server)
                .put('/api/v1/user')
                .send({
                    id: userId,
                    firstName: "Joe",
                    lastName: "UpdatedLastName",
                    email: "jomocha2@test.com",
                    password: "b2#testpassmochaonly",
                    phone: "+447879123456",
                    status: "active",
                    companyName: "Monika",
                    ownership: {
                        ownershipType: "monika"
                    }
                })  
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha2@test.com");
            });
        });

        describe('POST /api/v1/user/list', function () {
            before(function() {
                return new Promise(function(resolve, reject) {
                    Promise.all([
                        UserTestHelper.ensureTestUserExists("list1@test.com", "John", "Gamble", "deactivated"),
                        UserTestHelper.ensureTestUserExists("list2@test.com", "Daniel", "Catubigan"),
                        UserTestHelper.ensureTestUserExists("list3@test.com", "Cameron", "Ruiz"),
                        UserTestHelper.ensureTestUserExists("list4@test.com", "Annie", "Williams"),
                        UserTestHelper.ensureTestUserExists("list5@test.com", "Mary", "Smith", "deactivated"),
                        UserTestHelper.ensureTestUserExists("list6@test.com", "Brian", "Wist")
                    ]).then( (userIds) => {
                        resolve();
                    });    
                });
            });
            it('should return the active users sorted by first name', function() {
                request(server)
                .post('/api/v1/user/list')
                .send({
                    userListFilterQuery: {
                        status: "active"
                    },
                    userListSortQuery: {
                        sortBy: "first name",
                        order: "ascending"
                    }
                }) 
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    console.log(res.body);
                    res.body.should.have.a.lengthOf(4);
                    res.body[0].should.have.property('firstName', 'Annie');
                    res.body[1].should.have.property('firstName', 'Brian');
                    res.body[2].should.have.property('firstName', 'Cameron');
                    res.body[3].should.have.property('firstName', 'Daniel');
                    done();
                });
            });
            after(function() {
                return Promise.all([
                    UserTestHelper.ensureTestUserDoesntExist("list1@test.com"),
                    UserTestHelper.ensureTestUserDoesntExist("list2@test.com"),
                    UserTestHelper.ensureTestUserDoesntExist("list3@test.com"),
                    UserTestHelper.ensureTestUserDoesntExist("list4@test.com"),
                    UserTestHelper.ensureTestUserDoesntExist("list5@test.com"),
                    UserTestHelper.ensureTestUserDoesntExist("list6@test.com")
                ]);
            });
        });
        
    });
});
