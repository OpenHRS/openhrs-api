module.exports = function(Promise, mongoose) {
    mongoose.Promise = Promise;
    mongoose.connect(uri, {useMongoClient: true})
      .then(({db: {databaseName}}) => console.log(`Connected to ${databaseName}`))
      .catch(err => console.error(err));
}
