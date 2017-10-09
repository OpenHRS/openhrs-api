/**
 * @file elastic-setup.js
 * 
 * Create elastic client.
 * 
 * @author Jonathan Robello
 */

 module.exports = function(elasticsearch, config) {

    let client = new elasticsearch.Client({
        host: config.elastic.uri
    });

    client.ping({
        // ping usually has a 3000ms timeout 
        requestTimeout: 1000
    }, function (error) {
        if (error) {
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log('elasticsearch client running');
        }
    });

    return client;
 }
 