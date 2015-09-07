var ajax = require('s-ajax');

ajax.get({
	url: 'http://google.com',
	progress: function(n) {},
	success: function(response) {},
	error: function(response) {}
});

// methods are optional
// can also do `stateChange()`?
// and credentials
// and if POST, `upload` {
//	error() includes data from ontimeout and onabort,
//	progress(n) percentage,
//	uploaded
// }