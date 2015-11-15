module.exports = function(){
	this.Before(function(){
		server.call('reset');
	});
}