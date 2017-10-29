'use strict';

module.exports = function(mongoose) {
	let Statute = mongoose.model('Statute');

	let listAllStatutes = function(req, res) {
		Statute.find({}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByDivision = function(req, res) {
		Statute.find({division: req.params.division}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByDivisionTitle = function(req, res) {
		Statute.find({division: req.params.division,
			title: req.params.title}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByTitle = function(req, res) {
		Statute.find({title: req.params.title}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByTitleChapter = function(req, res) {
		Statute.find({title: req.params.title, 
			chapter: req.params.chapter}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByChapter = function(req, res) {
		Statute.find({chapter: req.params.chapter}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let listByChapterSection = function(req, res) {
		Statute.find({chapter: req.params.chapter, 
			section: req.params.section}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};
	
	let getById = function(req, res) {
		Statute.find({_id: req.query.val}, function(err, statute) {
			if (err)
				res.send(err);
			res.json(statute);
		});
	};

	return {
		listAllStatutes: listAllStatutes,
		listByDivision: listByDivision,
		listByDivisionTitle: listByDivisionTitle,
		listByTitle: listByTitle,
		listByTitleChapter: listByTitleChapter,
		listByChapter: listByChapter,
		listByChapterSection: listByChapterSection,
		getById: getById
	}
}