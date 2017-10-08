let config = {};

config.env = process.env.TYPE || 'dev';

config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'mongodb://localhost:27020/';
config.mongo.dbname = 'hrs';

module.exports = config;
