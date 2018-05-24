// This will turn a MongoConnect Promise into an Observable using the fromPromise method
const fromPromise = require('rxjs').Observable.fromPromise,
	MongoClient = require('mongodb').MongoClient,
	//Grab the connection string from env variables (if prod), or from config.js (if local)
	uri = process.env.MONGODB_URI || require('./config').MONGODB_URI;

const connectPromise = MongoClient.connect(uri);
module.exports = fromPromise(connectPromise);
