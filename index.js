'use strict';

/**
 * Exports
 */
var ajax = module.exports;


/**
 * reusable onload function
 * @param  {XMLHTTPRequest}   xhr
 * @param  {Function} fn  callback
 * @return {Function}       callback(err, response)
 */
function onload(xhr, fn) {

	if (xhr.status >= 200 && xhr.status < 400) {
		return fn(null, xhr.response);
	}

	var message = 'Error ' + xhr.status + ': ' + xhr.statusText;
	return fn(new Error(message));

}

/**
 * reusable progress handler
 * @param  {XMLHTTPRequest}   xhr
 * @param  {Function} fn  callback
 * @return {Function}       callback(progressPercentage)
 */
function onprogress(xhr, fn) {

	xhr.addEventListener('progress', function(e) {

		if (e.lengthComputable) {
			return fn(e.loaded / e.total);
		}

	}, false);

}

// ------------------------------------------------------------------

/**
 * Ajax constructor
 * @param {String} method ('get'|'post')
 * @param {Object} data (for post requests)
 * @param {XMLHTTPRequest} xhr
 */
function Ajax(method, xhr, data) {

	method = method.toLowercase();
	this.xhr = xhr;
	this.method = method;
	this.data = data;

	var types = {
		json: 'application/json',
		urlencoded: 'application/x-www-form-urlencoded'
	};

	// defaults to json for GET and urlencoded for POST
	var type = method === 'get' ? types.json : types.urlencoded;
	this.type(type);

}

/**
 * Set Content-Type request header
 * @param  {String} type
 */
Ajax.prototype.type = function(type) {
	this.xhr.setRequestHeader('Content-Type', type);
	return this;
};

/**
 * Set onerror handler
 * @param  {Function} fn callback(error)
 */
Ajax.prototype.error = function(fn) {
	this.xhr.onerror = fn;
	return this; // todo: also get errors by status
};

/**
 * Set download progress handler
 * @param  {Function} fn
 */
Ajax.prototype.progress = function(fn) {
	onprogress(this.xhr, fn);
	return this;
};

/**
 * Set upload progress handler
 * @param  {Function} fn
 */
Ajax.prototype.uploadProgress = function(fn) {
	onprogress(this.xhr.upload, fn);
	return this;
};

/**
 * Set post data
 * @param  {Function} fn
 */
Ajax.prototype.data = function(data) {
	this.data = data;
	return this;
};

/**
 * Submit ajax request
 * @param  {Function} fn callback with params (err, response)
 * @return {Void}
 */
Ajax.prototype.send = function(fn) {

	this.xhr.onload = onload(this.xhr, fn);
	
	if (this.data) {
		this.xhr.send(this.data);
	}
	else {
		this.xhr.send();
	}


};

// ------------------------------------------------------------------

/**
 * GET requests
 * @param  {String} url
 * @return {Ajax}
 */
ajax.get = function(url) {

	var xhr = new window.XMLHTTPRequest();
	xhr.open('GET', url, true);

	return new Ajax('get', xhr);

};

/**
 * POST requests
 * @param  {String} url
 * @param  {Object} data?
 * @return {Ajax}
 */
ajax.post = function(url, data) {

	var xhr = new window.XMLHTTPRequest();
	xhr.open('POST', url, true);

	return new Ajax('post', xhr, data);

};