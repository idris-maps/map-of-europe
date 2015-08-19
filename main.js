var d3 = require('d3');
var draw = require('./lib/draw')
var c = require('./lib/config')

var svg = d3.select('body').append('svg')
	.attr({
		height: c.height,
		width: c.width
	})

draw(svg, {height: c.height, width: c.width})
