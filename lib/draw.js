var d3 = require('d3');
var polygon = require('./polygon')
var line = require('./line')
var labels = require('./labels')
var adjust = require('./adjust')

//DATA (from 'naturalearth')
var land = require('../data/land.json')
var lakes = require('../data/lakes.json')
var urban = require('../data/urban.json')
var rivers = require('../data/rivers.json')
var countryLines = require('../data/countryLines.json')
var ferries = require('../data/roadFerries.json')
var majorRoads = require('../data/roadMajor.json')
var roads = require('../data/roadSecondary.json')
var cities = require('../data/cities.json')
var countryNamesBig = require('../data/countryLabelsBig.json')
var countryNamesSmall = require('../data/countryLabelsSmall.json')

//COLOURS
var col = {
	water: '#78979F',
	land: '#AFCFB9',
	urban: '#FFEBD7',
	road: '#FFDFBE',
	ferry: '#FFEBD7',
	country: '#CE7668',
	countryBg: '#FFC7BE'
}

module.exports = function(svg, canvas) {
	
//PROJECTION
	var projection = d3.geo.mercator()
		  .scale(1)
		  .translate([0, 0]);
	var path = d3.geo.path()
		  .projection(projection);
	var b = path.bounds(land);
	var s = 1 / Math.max((b[1][0] - b[0][0]) / canvas.width, (b[1][1] - b[0][1]) / canvas.height);
	var t = [(canvas.width - s * (b[1][0] + b[0][0])) / 2, (canvas.height - s * (b[1][1] + b[0][1])) / 2];
	projection
		  .scale(s)
		  .translate(t);

//BACKGROUND
	svg.append('rect')
		.attr({
			x: 0,
			y: 0,
			width: canvas.width,
			height: canvas.height,
			fill: col.water
		})

//POLYGONS
	polygon(svg, path, land, 'land', {fill: col.land, stroke: col.land})
	polygon(svg, path, lakes, 'lakes', {fill: col.water, stroke: col.water})
	polygon(svg, path, urban, 'urban', {fill: col.urban, stroke: col.urban})

//LINES
	line(svg, path, rivers, 'rivers', {strokeWidth: 1, stroke: col.water, strokeDasharray: 'none'})
	line(svg, path, countryLines, 'countryLines', {strokeWidth: 1, stroke: col.country, strokeDasharray: 'none'})
	line(svg, path, ferries, 'ferries', {strokeWidth: 0.5, stroke: col.ferry, strokeDasharray: '5,5'})
	line(svg, path, roads, 'roads', {strokeWidth: 0.5, stroke: col.road, strokeDasharray: 'none'})
	line(svg, path, majorRoads, 'roadsMajor', {strokeWidth: 1, stroke: col.road, strokeDasharray: 'none'})

//LABELS
	var cityAttrBg = {
		fill: 'white',
		fillOpacity: 1,
		stroke: 'white',
		strokeWidth: 1,
		strokeOpacity: 1,
		fontFamily: 'STIX',
		fontSize: 11,
		fontWeight: 'none'
	}
	var cityAttr = {
		fill: '#29606F',
		fillOpacity: 1,
		stroke: 'white',
		strokeWidth: 0,
		strokeOpacity: 0,
		fontFamily: 'STIX',
		fontSize: 11,
		fontWeight: 'none'
	}
	var countryNamesBigAttr = {
		fill: col.country,
		fillOpacity: 0.5,
		stroke: col.country,
		strokeWidth: 0,
		strokeOpacity: 0,
		fontFamily: 'STIX',
		fontSize: 18,
		fontWeight: 'bold'
	}
	var countryNamesSmallAttr = {
		fill: col.country,
		fillOpacity: 0.5,
		stroke: col.country,
		strokeWidth: 0,
		strokeOpacity: 0,
		fontFamily: 'STIX',
		fontSize: 12,
		fontWeight: 'none'
	}
	var countryNamesBigAttrBg = {
		fill: col.countryBg,
		fillOpacity: 0,
		stroke: col.countryBg,
		strokeWidth: 2,
		strokeOpacity: 0.5,
		fontFamily: 'STIX',
		fontSize: 18,
		fontWeight: 'bold'
	}
	var countryNamesSmallAttrBg = {
		fill: col.countryBg,
		fillOpacity: 0,
		stroke: col.countryBg,
		strokeWidth: 2,
		strokeOpacity: 0.5,
		fontFamily: 'STIX',
		fontSize: 12,
		fontWeight: 'none'
	}

	labels(svg, projection, cities, 'citiesBg', cityAttrBg)
	labels(svg, projection, cities, 'cities', cityAttr)
	labels(svg,projection, countryNamesBig, 'countryNamesBigBg', countryNamesBigAttrBg)
	labels(svg,projection, countryNamesSmall, 'countryNamesSmallBg', countryNamesSmallAttrBg)
	labels(svg,projection, countryNamesBig, 'countryNamesBig', countryNamesBigAttr)
	labels(svg,projection, countryNamesSmall, 'countryNamesSmall', countryNamesSmallAttr)


//ADJUSTMENTS
	var cityAdjust = {
		up: [108,31,197,251,195,8,45],
		down: [36,144,147,49,327],
		left: [80],
		right: []
	}
	for(i=0;i<cityAdjust.up.length;i++) { 
		adjust.moveUp(svg, '#cities' + cityAdjust.up[i], 6); 
		adjust.moveUp(svg, '#citiesBg' + cityAdjust.up[i], 6); 
	}
	for(i=0;i<cityAdjust.down.length;i++) { 
		adjust.moveDown(svg, '#cities' + cityAdjust.down[i], 6); 
		adjust.moveDown(svg, '#citiesBg' + cityAdjust.down[i], 6); 
	}
	for(i=0;i<cityAdjust.left.length;i++) { 
		adjust.moveLeft(svg, '#cities' + cityAdjust.left[i], 10); 
		adjust.moveLeft(svg, '#citiesBg' + cityAdjust.left[i], 10); 
	}

	adjust.moveUp(svg, '#countryNamesBig2', 3)
	adjust.moveUp(svg, '#countryNamesBigBg2', 3)
	adjust.moveDown(svg, '#countryNamesBig38', 15)
	adjust.moveDown(svg, '#countryNamesBigBg38', 15)
	adjust.moveLeft(svg, '#countryNamesBig47', 100)
	adjust.moveLeft(svg, '#countryNamesBigBg47', 100)
	adjust.moveRight(svg, '#countryNamesBig22', 50)
	adjust.moveRight(svg, '#countryNamesBigBg22', 50)
	adjust.moveRight(svg, '#countryNamesBig1', 30)
	adjust.moveRight(svg, '#countryNamesBigBg1', 30)
	adjust.moveUp(svg, '#countryNamesBig46', 5)
	adjust.moveUp(svg, '#countryNamesBigBg46', 5)
	adjust.moveLeft(svg, '#countryNamesBig20', 30)
	adjust.moveLeft(svg, '#countryNamesBigBg20', 30)
	adjust.moveUp(svg, '#countryNamesBig36', 20)
	adjust.moveUp(svg, '#countryNamesBigBg36', 20)
	adjust.moveUp(svg, '#countryNamesBig7', 20)
	adjust.moveUp(svg, '#countryNamesBigBg7', 20)
	adjust.moveUp(svg, '#countryNamesBig28', 20)
	adjust.moveUp(svg, '#countryNamesBigBg28', 20)
	adjust.moveDown(svg, '#countryNamesBig48', 15)
	adjust.moveDown(svg, '#countryNamesBigBg48', 15)
	adjust.moveRight(svg, '#countryNamesSmall7', 35)
	adjust.moveRight(svg, '#countryNamesSmallBg7', 35)
	adjust.moveDown(svg, '#countryNamesBig32', 15)
	adjust.moveDown(svg, '#countryNamesBigBg32', 15)
	adjust.moveDown(svg, '#countryNamesSmall8', 15)
	adjust.moveDown(svg, '#countryNamesSmallBg8', 15)
	adjust.moveUp(svg, '#countryNamesBig25', 30)
	adjust.moveUp(svg, '#countryNamesBigBg25', 30)
	adjust.moveDown(svg, '#countryNamesSmall9', 15)
	adjust.moveDown(svg, '#countryNamesSmallBg9', 15)
	adjust.moveDown(svg, '#countryNamesSmall5', 10)
	adjust.moveDown(svg, '#countryNamesSmallBg5', 10)
	adjust.moveDown(svg, '#countryNamesSmall2', 10)
	adjust.moveDown(svg, '#countryNamesSmallBg2', 10)
	svg.select('#countryNamesBig17').attr('transform', 'translate(100, 450)')
	svg.select('#countryNamesBigBg17').attr('transform', 'translate(100, 450)')
}


