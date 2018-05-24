// Here, we'll subscribe to the db connection Observable created in connectToDb.js
const 	fromPromise = require('rxjs').Observable.fromPromise,
		connectToDb = require('./connectToDb');

module.exports = {
	get(callback) {
		// subscribe to db connection
		connectToDb.subscribe(db => {
				// Grab all responses and turn them into a nice array
				const 	responsesCollection = db.collection('responses').find(),
						responsesArray = responsesCollection.toArray();

				// invoke callback when done, passing the nice array
				callback(fromPromise(responsesArray));
			});
	},

	save(items) {
		// subscribe to db connection
		connectToDb.subscribe(db => {
			const responsesCollection = db.collection('responses');
			responsesCollection.save(items, err => {
				if (err)
					throw err;
			});
		})
	}
};
