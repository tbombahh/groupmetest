const saveResponses = require('./responses');

// Takes an array of responses, and returns the least picked one
module.exports = responses => {
	// Sort the array in ascending order
	responses.sort((a, b) => a.timesPicked - b.timesPicked);

	// And picked the first one (least picked)
	const response = responses[0];

	// Since this response was chosen, we'll increment its timePicked property by 1
	response.timesPicked++;

	// Save this update to the database
	saveResponses.save(response);
	return response.text;
};
