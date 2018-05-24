const	express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/')
	// Any GroupMe event that happens will trigger this POST request
	.post((req, res) => {
		// Find out who propagated this event
		const sender_type = req.body.sender_type;

		// GroupMe fires many events, but we only care about the ones made by users
		// This will make it feel like the bot's actually replying to us
		if (sender_type === 'user') {
			// Low chance of success to prevent spamming the group ;)
			const 	chanceOfResponding = 0.15,
					getResponses = require('./responses'),
					pickResponse = require('./pickResponse');

			getResponses.get(observable => {
				observable.subscribe(responses => {
					if (process.env.isProd) {
						if (Math.random() < chanceOfResponding) {
							const randomResponse = pickResponse(responses);
							const request = require('request');
							const reqObj = {
								url: 'https://api.groupme.com/v3/bots/post',
								form: { 'text': randomResponse, 'bot_id': process.env.bot_id }
							};

							// Make the request with the bot's info and text
							request.post(reqObj, err => {
									if (err)
										throw err;

									return res.json({ success: true });
								});
						} else {
							return res.json({ success: true, message: 'Did not send this time' });
						}
					} else {
						const randomResponse = pickResponse(responses);

						// If not prod, this will always send (for local testing purposes)
						return res.json({ response: randomResponse });
					}
				});
			});
		}
	});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
