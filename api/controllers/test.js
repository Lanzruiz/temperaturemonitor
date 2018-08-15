
module.exports = {
	get : function( req, res) {
		console.log('testing a get request');
        return res.status(200).json({status: 200, message: "test succeeded"});
	},

    post : function( req, res) {
		console.log('testing a post request');
		return res.status(200).json({status: 200, message: "test succeeded"});
	},
}
 