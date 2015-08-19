module.exports = function(svg, path, data, cl, attribs) {
	var g = svg.append('g').attr('id', cl + 'Group')
	g.selectAll('path.' + cl)
		.data(data.features)
		.enter()
		.append('path')
		.attr('class', cl)
		.attr('d', path)
		.attr(attribs)
}

