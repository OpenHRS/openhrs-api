'use strict';

let routes = [];

routes.push({ url:'/statutes', route:require('./statutes.js') });
routes.push({ url:'/division', route:require('./statuteDivisions.js')});
routes.push({ url:'/title', route:require('./statuteTitles.js')});
routes.push({ url:'/chapter', route:require('./statuteChapters.js')});
routes.push({ url:'/id', route:require('./statuteGet.js')});
routes.push({ url:'/location', route:require('./statuteLocation.js')})

module.exports = routes;
