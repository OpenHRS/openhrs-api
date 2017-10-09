/**
 * @file InjectorSpec.js
 * 
 * Test depedency injector methods.
 * 
 * @author Jonathan Robello
 */

let Injector = new (require('../api/injector/Injector.js'))();

describe("Injector class test", function() {
    describe("test factory", function() {
        describe("add factory", function() {
            
            // add factory without depdencies
            it("should throw ERROR", function(done) {
                expect(function() {
                    Injector.addFactory('mongoose-setup',
                        require('../api/services/mongoose-setup'));
                    }).toThrowError("ERROR 'Promise' does not exist!");
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
                    require('../api/services/Promise'));
                Injector.addFactory('mongoose-setup', 
                    require('../api/services/mongoose-setup'));
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
            let depedency = Injector.getDepedency('bluebird');
            expect(depedency).not.toEqual(null);
            done();
        });

        // get a factory
        it("should return npm package", function(done) {
            let depedency = Injector.getDepedency('mongoose-setup');
            expect(depedency).not.toEqual(null);
            done();
        });

        // get factory/service that not exist
        it("should return null", function(done) {
            let depedency = Injector.getDepedency('mongoose-stup');
            expect(depedency).toEqual(null);
            done();
        });
    });
});
