/**
 * @file Injector.js
 * 
 * Contains Injector class for managing services/factories.
 * 
 * @author Jonathan Robello
 */

module.exports = class Injector {

    constructor() {
        this.services  = {};
        this.factories = {};
    }

    /**
     * Get the parameters of a function.
     * @method getArgs
     * @param {*} func - function to get parameters from.
     * @return {String[]} the parameters of a function.
     */
    getArgs(func) {
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
        return this.factories[factory];
    }

    /**
     * Return a new service.
     * @method getService
     * @param {*} service - name of service.
     * @return {service} a new service object.
     */
    getService(service) {
        return new this.services[service];
    }
};
