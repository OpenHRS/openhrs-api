/**
 * @file SearchService.js
 * 
 * Contains methods for searching hrs documents.
 * 
 * @author Jonathan Robello
 */

module.exports = function(elastic_client) {

    let client = elastic_client;

    /**
     * Search for documents close to the given input.
     * @method searchDocs
     * @param {*} req - the request object.
     * @param {*} res - the response object
     */
    let searchDocs = (function(req, res) {
        client.search({
            index: 'hrs',
            body: {
                "size": req.query.size,
                "query":{
                  "bool": {
                    "should": [
                        {
                          "match_phrase_prefix": {
                            "section_text": {
                              "query":req.query.input,
                              "boost":7
                            }
                          }
                        },
                        {
                          "match": {
                            "section_text": {
                              "query": req.query.input,
                              "fuzziness": 1,
                              "boost":5
                            }
                          }
                        },
                        {
                            "match": {
                              "chapter_text": {
                                "query": req.query.input,
                                "fuzziness": 1,
                                "boost":5
                              }
                            }
                          },
                        {
                          "match_phrase": {
                            "chapter_section": {
                              "query": req.query.input,
                              "boost":10
                            }
                          }
                        },
                        {
                          "match": {
                            "text": {
                              "query": req.query.input,
                              "fuzziness": 1
                            }
                          }
                        },
                        {
                          "common": {
                            "query": req.query.input
                          }
                        },
                        {
                          "match": {
                            "chapter": {
                              "query": req.query.input,
                              "boost":9
                            }
                          }
                        },
                        {
                          "match": {
                            "section": {
                              "query": req.query.input,
                              "boost":5
                            }
                          }
                        }
                      ],
                      "minimum_should_match": 1
                  }
                },
                "_source": ["_id", "division", "division_text", "volume", 
                    "title", "title_text", "chapter", "chapter_text", "section", 
                    "section_text", "year"]
            }
        }).then(function(docs) {
            res.json(docs.hits.hits);
        }).catch(function(response) {
            console.log(response);
        });
    });

    /**
     * Gets a single statute by its chapter and section.
     * @method getChapterSection
     * @param {*} req - the request object.
     * @param {*} res - the response object.
     */
    let getChapterSection = (function(req, res) {
      client.search({
          index: 'hrs',
          body: {
              "size": 1,
                "query":{
                  "bool": {
                    "filter": [
                      { "term": { "chapter": req.query.chapter }},
                      { "term": { "section": req.query.section }}
                    ]
                  }
                },
                "_source": [
                    "_id", "division", "division_text", "volume", 
                    "title", "title_text", "chapter", "chapter_text", "section", 
                    "section_text", "year"
              ]
            }
        }).then(function(docs) {
            res.json(docs.hits.hits);
        }).catch(function(res){
            console.log(res);
        });
    });

    return {
        searchDocs: searchDocs,
        getChapterSection: getChapterSection
    }
}