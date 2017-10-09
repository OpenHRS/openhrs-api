let config = {};

config.env = process.env.TYPE || 'dev';

config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'mongodb://localhost:27020/';
config.mongo.dbname = 'hrs';

config.elastic = {};
config.elastic.uri = process.env.ELASTIC_URI || 'http://localhost:9200';

module.exports = config;
