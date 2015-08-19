var config = require('./config')

module.exports = function(svg, projection, data, cl, attribs) {
	var g = svg.append('g')
		.attr('class', cl + 'group')
		.attr('transform', 'translate(0, ' + attribs.fontSize / 2 + ')')
	for(i=0;i<data.features.length;i++) {
		g.append('text')
			.attr({
				id: cl + i,
				x: projection(data.features[i].geometry.coordinates)[0],
				y: projection(data.features[i].geometry.coordinates)[1],
				fill: attribs.fill,
				'fill-opacity': attribs.fillOpacity,
				stroke: attribs.stroke,
				'font-family': attribs.fontFamily,
				'text-anchor': 'middle',
				'font-size': attribs.fontSize,
				'stroke-width': attribs.strokeWidth,
				'stroke-opacity': attribs.strokeOpacity,
				'font-weight': attribs.fontWeight
			})
			.text(data.features[i].properties.name)
	}
}
