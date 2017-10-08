module.exports = function(Promise, mongoose, config) {
    mongoose.Promise = Promise;
    mongoose.connect(config.mongo.uri, {useMongoClient: true})
      .then(({db: {databaseName}}) => console.log(`Connected to ${databaseName}`))
      .catch(err => console.error(err));
}
