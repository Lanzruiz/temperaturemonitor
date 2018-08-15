var path = require('path');
var dotEnvPath = path.resolve('../../.env');
require('dotenv').config({ path: dotEnvPath});
var should = require('should');
var request = require('supertest');
const assert = require('assert');
var UserTestHelper = require('../helpers/userTest.helper');
var UserService = require('../../services/user.service');
var userService = new UserService();

describe('services', function () {
    describe('user.service', function () {

        describe('addUser', function () {
            before(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha3@test.com");
            });
            it('should return a uuid', function () {
                var user = {
                    firstName: "Joe",
                    lastName: "Mocha",
                    email: "jomocha3@test.com",
                    password: "b2#testpassmochaonly",
                    phone: "+447879123456",
                    status: "active",
                    companyName: "Monika",
                    ownership: {
                        ownershipType: "monika"
                    }
                }
                return userService.addUser(user).should.eventually.have.lengthOf(36);
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha3@test.com");
            });
        });
        
        describe('updateUser', function () {
            var userId;
            before(function() {
                return new Promise(function(resolve, reject) {
                    UserTestHelper.ensureTestUserExists("jomocha4@test.com").then( (testUserId) => {
                        userId = testUserId;
                        resolve();
                    });    
                });
            });
            it('should have changed the lastName of the user', function() {
                var user = {
                    id: userId,
                    firstName: "Joe",
                    lastName: "UpdatedLastName",
                    email: "jomocha4@test.com",
                    password: "b2#testpassmochaonly",
                    phone: "+447879123456",
                    status: "active",
                    companyName: "Monika",
                    ownership: {
                        ownershipType: "monika"
                    }
                }
                return userService.updateUser(user).then( () => {
                    return userService.getUserWithId(user.id);
                }).then( (user) => {
                    user.should.have.property('lastName', 'UpdatedLastName');
                });
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha4@test.com");
            });
        });

        describe('deactivateUser', function () {
            before(function() {
                return new Promise(function(resolve, reject) {
                    UserTestHelper.ensureTestUserExists("jomocha5@test.com").then( (testUserId) => {
                        userId = testUserId;
                        resolve();
                    });    
                });
            });
            it('should have changed the status of the user', function() {
                return userService.getUserWithEmailAddress("jomocha5@test.com").then( (user) => {
                    return userService.deactivateUser(user.id).then( () => {
                        return userService.getUserWithId(user.id);                    
                    }).then( (updatedUser) => {
                        updatedUser.should.have.property('status', 'deactivated');
                    });
                });
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha5@test.com");
            });
        });

        describe('activateUser', function () {
            before(function() {
                return new Promise(function(resolve, reject) {
                    UserTestHelper.ensureTestUserExists("jomocha6@test.com", "Joseph", "Mocha", "deactivated").then( (testUserId) => {
                        userId = testUserId;
                        resolve();
                    });    
                });
            });
            it('should have changed the status of the user', function() {
                return userService.getUserWithEmailAddress("jomocha6@test.com").then( (user) => {
                    user.should.have.property('status', 'deactivated');
                    return userService.activateUser(user.id).then( () => {
                        return userService.getUserWithId(user.id);                    
                    }).then( (updatedUser) => {
                        updatedUser.should.have.property('status', 'active');
                    });
                });
            });
            after(function() {
                return UserTestHelper.ensureTestUserDoesntExist("jomocha6@test.com");
            });
        });
        
        describe('listUsers', function () {
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
                var filterSortQuery = {
                    userListFilterQuery: {
                        status: "active"
                    },
                    userListSortQuery: {
                        sortBy: "first name",
                        order: "ascending"
                    }
                }
                return userService.listUsers(filterSortQuery).then( (users) => {
                    users.should.have.a.lengthOf(4);
                    users[0].should.have.property('firstName', 'Annie');
                    users[1].should.have.property('firstName', 'Brian');
                    users[2].should.have.property('firstName', 'Cameron');
                    users[3].should.have.property('firstName', 'Daniel');
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
