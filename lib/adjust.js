exports.moveUp = function(svg, id, q) {
	svg.select(id).attr('transform', 'translate(0, -' + q + ')')
}

exports.moveDown = function(svg, id, q) {
	svg.select(id).attr('transform', 'translate(0, ' + q + ')')
}

exports.moveRight = function(svg, id, q) {
	svg.select(id).attr('transform', 'translate(' + q + ',0)')
}

exports.moveLeft = function(svg, id, q) {
	svg.select(id).attr('transform', 'translate(-' + q + ',0)')
}
