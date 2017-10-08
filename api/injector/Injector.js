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
     * Returns a depedency.
     * @method getDepedency
     * @param {String} depedency - name of service or factory
     * @return {service|factory} a factory or service.
     */
    getDepedency(depedency) {
        if (getService(depedency))
            return getService(depedency);

        if (getFactory(depedency))
            return getFactory(depedency);
        
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

        let args = this.getArgs(factory),
            params = [];

        if (that.getFactory(name) !== null || 
            that.getService(name) !== null) {
            console.error("ERROR " + name +  
                " already in use by service/factory!")
            process.exit(1);
        }

        args.forEach(function(arg) {
            console.log(that.getFactory(arg));
            if (that.getFactory(arg)) {
                params.push(getFactory(arg));
            } else if (that.getService(arg)) {
                params.push(getService(arg));
            } else {
                console.error("ERROR '" + arg + "' does not exist!")
                process.exit(1);
            }
        });

        if (that.isFunction(factory))
            that.factories[name] = factory(...params);
        else
            that.factories[name] = factory;
    }
};
