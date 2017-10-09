module.exports = function(express, BrowseService) {
	let router = express.Router(),
		childRouter = express.Router({mergeParams: true});
	
	router.use('/:chapter/section', childRouter);
		
	router.route('/:chapter')
		.get(BrowseService.listByChapter);
		
	childRouter.route('/')
		.get(BrowseService.listByChapter);
			
	childRouter.route('/:section')
		.get(BrowseService.listByChapterSection)
	
	return router;
}
