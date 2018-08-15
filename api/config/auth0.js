var request = require("request");

var options = { method: 'POST',
  url: 'https://monikaproject.au.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"fCwkEvURp6DnbHxa42JSsc7P2LjQjuBD","client_secret":"TOwi0SuouL6r-003Dt_BJyOxDLdHfFNuSsqW3lMczT5PuM1WlHrrwnuwZl-QEW2e","audience":"https://monikaproject.au.auth0.com/api/v2/","grant_type":"client_credentials", "privilage": 1}' };

module.exports.generateAccess_token = function(callback) {

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  callback(body);
	});
}	
