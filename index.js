// ----- main exported object
// ---------------------------------------
var ajax = module.exports = {};


// ----- reusable response methods
// ---------------------------------------
function onload(req, fn) {
	if (req.status >= 200 && req.status < 400) {
		var text = req.responseText;
		var data = req.responseType === 'json' ? JSON.parse(text) : text;
		return fn(null, data);
	}
	else {
		return fn(new Error('Server returned an error'));
	}
};

function onerror(fn) {
	return fn(new Error('Connection error'));
}


// ----- GET requests
// ---------------------------------------
ajax.get = function(url, fn) {

	var req = new XMLHttpRequest();
	
	req.open('GET', url, true); // method, url, async boolean

	req.onload = onload(req, fn);
	req.onerror = onerror(fn);

	req.send();

};


// ----- POST requests
// ---------------------------------------
ajax.post = function(url, data, fn) {

	var req = new XMLHttpRequest();

	req.open('POST', url, true);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	req.onload = onload(req, fn);
	req.onerror = onerror(fn);

	req.send(data);

};