/**
 * @file manager.js
 * 
 * Manager for all routes and depedencies.
 * 
 * @author Jonathan Robello
 */

let injector = new (require('./injector/Injector.js'))();

injector.addFactory('mongoose', require('mongoose'));
injector.addFactory('mongoose-setup', require('./services/mongoose-setup'));
