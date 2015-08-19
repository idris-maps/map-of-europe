module.exports = function(bbox) {
	var rect = {
		"type": "Feature",
		"geometry": {
			"type": "Polygon",
			"coordinates": [[
					[bbox.minLng,bbox.minLat],
					[bbox.maxLng,bbox.minLat],
					[bbox.maxLng,bbox.maxLat],
					[bbox.minLng,bbox.maxLat],
					[bbox.minLng,bbox.minLat]
				]]
		},
		"properties": {}
	}
	return {"type": "FeatureCollection", "features": [rect]}
}
