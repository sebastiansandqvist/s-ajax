# s-ajax 

## Work in Progress

[![NPM version](https://img.shields.io/npm/v/s-ajax.svg)](https://www.npmjs.com/package/s-ajax) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/s-ajax.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/s-ajax.svg)](https://travis-ci.org/sebastiansandqvist/s-ajax) [![NPM license](https://img.shields.io/npm/l/s-ajax.svg)](https://www.npmjs.com/package/s-ajax)

A chainable wrapper around the XMLHttpRequest API

## Installation
```bash
npm install --save s-ajax
```
*s-ajax uses CommonJS, so bundle via Browserify/Webpack/etc. before use.*

## Usage
```javascript
var ajax = require('s-ajax');


// A simple GET request
ajax.get('https://foo.com').send(function(err, data) {
	// ...
});


// A POST request with error and progress handling
var data = {
	foo: 'bar'
}

function onProgress(percentage) {
	console.log(percentage);
}

function onError(err) {
	console.log(err);
}

function onLoad(err, response) {
	console.log(err, response);
}

ajax.post('https://foo.com')
	.data(data)
	.uploadProgress(onProgress)
	.error(onError)
	.send(onLoad);

ajax.get('https://example.com', function(err, data) {
	console.log(data);
});

ajax.post('https://example.com', {foo: 'bar'}, function(err, response) {
	console.log(response);
});
```

## In progress:
* Tests & coverage
* AJAX file upload support

## License
Copyright (c) 2015, Sebastian Sandqvist <s.github@sparque.me>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.