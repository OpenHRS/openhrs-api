'use strict';

module.exports = function(express, BrowseService) {
    let router = express.Router();

    router.route('/')
        .get(BrowseService.getById);
    
    return router;
}
