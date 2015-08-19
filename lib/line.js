module.exports = function(svg, path, data, cl, attribs) {
	var g = svg.append('g').attr('id', cl + 'Group')
	
	g.selectAll('path.' + cl)
		.data(data.features)
		.enter()
		.append('path')
		.attr({
			'class': cl,
			d: path,
			fill: 'none',
			stroke: attribs.stroke,
			'stroke-width': attribs.strokeWidth,
			'stroke-dasharray': attribs.strokeDasharray
		})
}
