var jsdom = require('node-jsdom');
var fs = require('fs');
var draw = require('./lib/draw')
var c = require('./lib/config')

jsdom.env(
  "<html><body></body></html>",
  [ 'http://localhost:3000/js/d3.min.js' ],
  function (err, window) {
		var body = window.d3.select('body')
		var svg = body.append('svg')
			.attr({
				height: c.height,
				width: c.width
			})
		draw(svg, {height: c.height, width: c.width})
		fs.writeFileSync('map.svg', window.d3.select("body").html());
  }
)
