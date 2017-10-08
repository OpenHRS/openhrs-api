'use strict';

let express = require('express');

let routes = [];

routes.push({ url:'/statutes', route:require('./routes/statutes.js') });
routes.push({ url:'/division', route:require('./routes/statuteDivisions.js')});
routes.push({ url:'/title', route:require('./routes/statuteTitles.js')});
routes.push({ url:'/chapter', route:require('./routes/statuteChapters.js')});
routes.push({ url:'/id', route:require('./routes/statuteGet.js')});
routes.push({ url:'/location', route:require('./routes/statuteLocation.js')})

module.exports = routes;
