/**
 * @file manager.js
 * 
 * Manager for all routes and dependencies.
 * 
 * @author Jonathan Robello
 */

let injector = new (require('./injector/Injector.js'))();

// factories - references Object
injector.addFactory('express', require('express'));
injector.addFactory('bluebird', require('bluebird'));
injector.addFactory('mongoose', require('mongoose'));
injector.addFactory('Promise', require('./services/Promise'));
injector.addFactory('config', require('../config'));
injector.addFactory('mongoose-setup', require('./services/mongoose-setup'));
injector.addFactory('elasticsearch', require('elasticsearch'));
injector.addFactory('statuteModel', require('./models/statuteModel'));
injector.addFactory('locationModel', require('./models/locationModel'));
injector.addFactory('BrowseService', require('./services/BrowseService'));
injector.addFactory('elastic_client', require('./services/elastic-setup'));
injector.addFactory('SearchService', require('./services/SearchService'));
injector.addFactory('LocationService', require('./services/LocationService'));

// services - instantiates Object

// routes
injector.addRoute('/statutes', require('./routes/statutes'));
injector.addRoute('/division', require('./routes/statuteDivisions'));
injector.addRoute('/title', require('./routes/statuteTitles'));
injector.addRoute('/chapter', require('./routes/statuteChapters'));
injector.addRoute('/id', require('./routes/statuteGet'));
injector.addRoute('/location', require('./routes/statuteLocation'));

module.exports = injector;
