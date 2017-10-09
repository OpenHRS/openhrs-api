'use strict';

module.exports = function(express, BrowseService) {
	let router = express.Router(),
		childRouter = express.Router({mergeParams: true});
	
	router.use('/:title/chapter', childRouter);
		
	router.route('/:title')
		.get(BrowseService.listByTitle);
		
	childRouter.route('/')
		.get(BrowseService.listByTitle);
		
	childRouter.route('/:chapter')
		.get(BrowseService.listByTitleChapter);

	return router;
}
