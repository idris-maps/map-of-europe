var express = require('express')
var app = express()

app.use('/js', express.static(__dirname + '/public/js'))
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
})

var port = 3000;
app.listen(port, function() {console.log('listening on port ' + port)})
