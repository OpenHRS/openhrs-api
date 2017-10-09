/**
 * @file Injector.js
 * 
 * Contains Injector class for managing services/factories/routes.
 * 
 * @author Jonathan Robello
 */

module.exports = class Injector {

    constructor() {
        // services
        this.services  = {};
        this.factories = {};
        
        // routes
        this.routes = [];

        // get list of installed packages
        this.packages = require('../../package.json')["dependencies"];
    }

    /**
     * Check if value is a function.
     * @method isFunction
     * @param {*} func - function to check.
     * @return {bool} return true if func otherwise false
     */
    isFunction(func) {
        let getType = {};
        return func && 
            getType.toString.call(func) === '[object Function]';
    }

    /**
     * Get the parameters of a function.
     * @method getArgs
     * @param {*} func - function to get parameters from.
     * @return {String[]} the parameters of a function.
     */
    getArgs(func) {
        if (func.toString().match(/function\s.*?\(([^)]*)\)/) === null)
            return [];
        
        let args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
  
        return args.split(',').map(function(arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            return arg;
        });
    }

    /**
     * Return a reference to a factory.
     * @method getFactory
     * @param {*} factory - name of factory.
     * @return {factory} a reference to factory.
     */
    getFactory(factory) {
        return (this.factories[factory] !== undefined) ?
            this.factories[factory] : null;
    }

    /**
     * Return a new service.
     * @method getService
     * @param {*} service - name of service.
     * @return {service} a new service object.
     */
    getService(service) {
        return (this.services[service] !== undefined) ?
            Object.create(this.services[service]) : null;
    }

    /**
     * Returns a dependency.
     * @method getDepedency
     * @param {String} depedency - name of service or factory
     * @return {service|factory} a factory or service.
     */
    getDependency(dependency) {
        if (this.getService(dependency))
            return this.getService(dependency);

        if (this.getFactory(dependency))
            return this.getFactory(dependency);
        
        return null;
    }

    /**
     * Return all routes.
     * @method getRoutes
     * @return {route[]} a list of routes.
     */
    getRoutes() {
        return this.routes;
    }

    /**
     * Creates a new factory
     * @method addFactory
     * @param {String} name - name of the factory.
     * @param {*} factory - factory object to add.
     */
    addFactory(name, factory) {
        let that = this;

        let args = that.getArgs(factory),
            params = [];

        if (that.getFactory(name) !== null || 
            that.getService(name) !== null) {
            throw new Error("ERROR " + name +  
                " already in use by service/factory!");
        }

        // really cheap fix for npm packages or config file...
        if (that.packages[name] !== undefined || name === 'config') {
            this.factories[name] = factory;
            return;
        }

        args.forEach(function(arg) {
            if (that.getFactory(arg)) {
                params.push(that.getFactory(arg));
            } else if (that.getService(arg)) {
                params.push(that.getService(arg));
            } else {
                throw new Error("ERROR '" + arg + "' does not exist!")
            }
        });

        that.factories[name] = factory(...params);
    }

    /**
     * Creates a new service
     * @method addService
     * @param {String} name - name of the service.
     * @param {*} service - service object to add.
     */
    addService(name, service) {
        let that = this;
        
        let args = that.getArgs(service),
            params = [];
        
        if (that.getFactory(name) !== null || 
            that.getService(name) !== null) {
            throw new Error("ERROR " + name +  
                " already in use by service/factory!");
        }

        // really cheap fix for npm packages or config file...
        if (that.packages[name] !== undefined || name === 'config') {
            this.factories[name] = service;
            return;
        }

        args.forEach(function(arg) {
            if (that.getFactory(arg)) {
                params.push(that.getFactory(arg));
            } else if (that.getService(arg)) {
                params.push(that.getService(arg));
            } else {
                throw new Error("ERROR '" + arg + "' does not exist!")
            }
        });

        that.services[name] = service(...params);
    }

    /**
     * Create new route.
     * @method addRoute
     * @param {String} url - url of route.
     * @param {*} route - the route.
     */
    addRoute(url, route) {
        let that = this;

        let args = that.getArgs(route),
            params = [];

        args.forEach(function(arg) {
            if (that.getFactory(arg)) {
                params.push(that.getFactory(arg));
            } else if (that.getService(arg)) {
                params.push(that.getService(arg));
            } else {
                throw new Error("ERROR '" + arg + "' does not exist!")
            }
        });

        this.routes.push({ url:url, route:route(...params) });
    }
};
