'use strict';

module.exports = function(express, LocationService) {
	let router = express.Router();

	router.route('/')
		.get(LocationService.listAllLocations)
		.post(LocationService.postLocation);
	
	return router;
}
