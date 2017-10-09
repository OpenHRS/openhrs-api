/**
 * @file manager.js
 * 
 * Manager for all routes and depedencies.
 * 
 * @author Jonathan Robello
 */

let injector = new (require('./injector/Injector.js'))();

// factories
injector.addFactory('express', require('express'));
injector.addFactory('bluebird', require('bluebird'));
injector.addFactory('mongoose', require('mongoose'));
injector.addFactory('Promise', require('./services/Promise'));
injector.addFactory('config', require('../config'));
injector.addFactory('mongoose-setup', require('./services/mongoose-setup'));
injector.addFactory('elasticsearch', require('elasticsearch'));
injector.addFactory('statuteModel', require('./models/statuteModel'));
injector.addFactory('locationModel', require('./models/locationModel'));

module.exports = injector;
