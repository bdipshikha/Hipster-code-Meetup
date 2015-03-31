
var net = require('net');
var port = 3000;
var rsvpInfo = [];
var topic = process.argv[2];
var date = process.argv[3];
var count = 0;

var server = net.createServer(function(socket) {			
	console.log('client connected');
	socket.write("Welcome to the Meet up" + " " + topic + " " +"on"+ " " +date + "\n")
	count++;
	// console.log(count)
	socket.write("Please sign up for the Meet Up event with your Name as Name:your name and Email as Email:your e-mail")
	
	socket.on('data', function(data) {
		socket.write("The number of developers attending"+" "+ count)
		//console.log(data.toString())

		process.stdin.on('readable', function() {
		var chunk = process.stdin.read();
			if (chunk !== null) {
				socket.write(chunk);
			}
		});

		rsvpInfo.push(data.toString().trim());
		console.log(data.toString().trim())

	function createJson() {

		var j = JSON.stringify(rsvpInfo);
		var fs = require("fs");

		fs.writeFile("rsvpInfo.json", j, function(err){
			if(err) {
				console.log(err)
			}	else {
				console.log('Worked!')
			}			
		});
		
		var p = JSON.parse(j);
		var fs = require("fs");

		fs.readFile("rsvpInfo.json", function(err) {
		if (err) {
			console.log(err)
		} else {
			console.log(p)
		}
		});
		for (var i = 0; i<40; i++){
			if (p.length === 2) {
				 p = [""]
			}
		}
	}
	createJson(rsvpInfo);

	
	});

	socket.on('end', function() {	
		console.log('client disconnected');
	});

});

server.listen(port, function() { //'listening' listener
	console.log('listening on port ' + port);
});



		





