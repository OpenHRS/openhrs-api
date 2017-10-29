/**
 * @file InjectorSpec.js
 * 
 * Test depedency injector methods.
 * 
 * @author Jonathan Robello
 */

let Injector = new (require('../src/injector/Injector.js'))();

describe("Injector class test", function() {
    describe("test factory", function() {
        describe("add factory", function() {
            
            // add factory without depdencies
            it("should throw ERROR", function(done) {
                expect(function() {
                    Injector.addFactory('mongoose-setup',
                        require('../src/services/mongoose-setup'));
                }).toThrowError(
                    "ERROR 'Promise' does not exist!"
                );
                done();
            });

            // adding npm packages
            it("should add package", function(done) {
                Injector.addFactory('bluebird', require('bluebird'));
                Injector.addFactory('mongoose', require('mongoose'));
                done();
            });

            // add factory with same name
            it("should throw ERROR", function(done) {
                expect(function() {
                    Injector.addFactory('bluebird', {});
                }).toThrowError("ERROR bluebird already in use by service/factory!");
                done();
            });

            // adding factory
            it("should add factory and inject depedencies", function(done) {
                Injector.addFactory('config', 
                    require('../config'));
                Injector.addFactory('Promise', 
                    require('../src/services/Promise'));
                Injector.addFactory('mongoose-setup', 
                    require('../src/services/mongoose-setup'));
                done();
            });
        });

        describe("get factory", function() {

            // gettting an npm package
            it("should return npm package", function(done) {
                let factory = Injector.getFactory('bluebird');
                expect(factory).not.toEqual(null);
                done();
            });

            // getting a factory
            it("should return the factory", function(done) {
                let factory = Injector.getFactory('mongoose-setup');
                expect(factory).not.toEqual(null);
                done();
            });

            // should return null if not exist
            it("should return null", function(done) {
                let factory = Injector.getFactory('express');
                expect(factory).toEqual(null);
                done();
            });
        });
    });

    describe("test get dependency", function() {

        // get a package
        it("should return npm package", function(done) {
            let dependency = Injector.getDependency('bluebird');
            expect(dependency).not.toEqual(null);
            done();
        });

        // get a factory
        it("should return npm package", function(done) {
            let dependency = Injector.getDependency('mongoose-setup');
            expect(dependency).not.toEqual(null);
            done();
        });

        // get factory/service that not exist
        it("should return null", function(done) {
            let dependency = Injector.getDependency('mongoose-stup');
            expect(dependency).toEqual(null);
            done();
        });
    });

    describe("test service methods", function() {
        describe("add service", function() {
            
            // add service with name taken
            it("should ERROR", function(done) {
                expect(function() {
                    Injector.addService('bluebird', require('bluebird'));
                }).toThrowError(
                    "ERROR bluebird already in use by service/factory!" 
                );
                done();
            });

            // add dummy service with missing depedency.
            it("should ERROR", function(done) {
                expect(function() {
                    Injector.addService('dummy', function(elasticsearch) {
                        return this;
                    });
                }).toThrowError(
                    "ERROR 'elasticsearch' does not exist!" 
                );
                done();
            });

            // add new dummy service and inject depedencies.
            it("should add new service", function(done) {
                Injector.addService('dummy', function(mongoose, Promise, config) {
                    return this;
                });
                done();
            });
        });

        describe("get service", function() {

            // get service
            it("should return a new service", function(done) {
                let dependency1 = Injector.getService('dummy');
                let dependency2 = Injector.getService('dummy');

                // test if new objects
                expect(dependency1 == dependency2).toEqual(false);

                expect(dependency1).not.toEqual(null);
                expect(dependency2).not.toEqual(null);
                done();
            });

            // get service that not exist
            it("should return null", function(done) {
                let dependency = Injector.getService('dumy');
                expect(dependency).toBe(null);
                done();
            });
        });
    });

    describe("test routing method", function() {
        describe("get routes", function() {

            // get routes with nothing
            it("should return empty array", function(done) {
                let routes = Injector.getRoutes();
                expect(routes.length).toEqual(0);
                done();
            });

            // add route with missing service
            it("should ERROR", function(done) {
                expect(function() {
                    Injector.addRoute('/chapter',
                        require('../src/routes/statuteChapters'));
                }).toThrowError(
                    "ERROR 'express' does not exist!"
                );
                done();
            });

            // add route with depdencies
            it("should add route", function(done) {
                Injector.addFactory('statuteModel', 
                    require('../src/models/statuteModel'));
                Injector.addFactory('express', require('express'));
                Injector.addFactory('BrowseService', 
                    require('../src/services/BrowseService'));
                Injector.addRoute('/chapter',
                    require('../src/routes/statuteChapters'));
                done();
            });

            // get routes with single route
            it("should return array with 1 route", function(done) {
                let routes = Injector.getRoutes();
                expect(routes.length).toEqual(1);
                done();
            });
        });
    });
});
