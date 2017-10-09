'use strict';

module.exports = function(express, BrowseService, SearchService) {
    let router = express.Router();

    router.route('/')
	    .get(BrowseService.listAllStatutes);
	  
    router.route('/search')
        .get(SearchService.searchDocs);

    router.route('/search/chaptersection')
        .get(SearchService.getChapterSection);
    
    return router;
}
