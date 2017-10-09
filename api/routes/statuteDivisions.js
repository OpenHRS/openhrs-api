'use strict';

module.exports = function(express, BrowseService) {
	let router = express.Router(),
		childRouter = express.Router({mergeParams: true});
	
	router.use('/:division/title', childRouter);
		
	router.route('/:division')
		.get(BrowseService.listByDivision);
		
	childRouter.route('/')
		.get(BrowseService.listByDivision);
		
	childRouter.route('/:title')
		.get(BrowseService.listByDivisionTitle);
	
	return router;
}
