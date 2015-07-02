// ----- main exported object
// ---------------------------------------
var ajax = module.exports = {};


// ----- reusable response methods
// ---------------------------------------
function onload(req, resolve, reject) {
	if (req.status >= 200 && req.status < 400) {
		resolve(req.response);
	}
	else {
		reject(new Error('Server returned error ' + req.status + ': ' + req.statusText));
	}
}

function onerror(reject) {
	reject(new Error('Connection error'));
}


// ----- GET requests
// ---------------------------------------
ajax.get = function(url) {

	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();

		req.open('GET', url);
		
		req.onload = onload(req, resolve, reject);
		req.onerror = onerror(reject);

		req.send();

	});

};


// ----- POST requests
// ---------------------------------------
ajax.post = function(url, data) {

	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();

		req.open('POST', url);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		req.onload = onload(req, resolve, reject);
		req.onerror = onerror(reject);

		req.send(data);

	});

};