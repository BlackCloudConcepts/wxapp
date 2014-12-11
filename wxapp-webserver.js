//require('./conf.js');
var cluster = require('cluster');
var PORT = 8134;
var http = require("http")
var url = require("url")
var path = require("path")
var fs = require("fs")

if (cluster.isMaster) {
  	cluster.fork();
  	cluster.fork();

  	cluster.on('disconnect', function(worker) {
    		console.error('disconnect!');
    		cluster.fork();
  	});

} else {
	var domain = require('domain');

  	var server = require('http').createServer(function(request, response) {
		var d = domain.create();
		d.on('error', function(er) {
			console.error('error', er.stack);

			try {
				var killtimer = setTimeout(function() {
					process.exit(1);
				}, 30000);
				killtimer.unref();
				server.close();
				cluster.worker.disconnect();

				// try to send an error to the request that triggered the problem
				response.statusCode = 500;
				response.setHeader('content-type', 'text/plain');
				response.end('Oops, there was a problem!\n');
			} catch (er2) {
				console.error('Error sending 500!', er2.stack);
			}
		});

		d.add(request);
		d.add(response);

		d.run(function() {
			var uri = url.parse(request.url).pathname 
			var filename = path.join(process.cwd(), ''+uri);
			var contentTypesByExtension = {
				'.html': "text/html",
				'.css':  "text/css",
				'.js':   "text/javascript"	
			};

			fs.exists(filename, function(exists) {
				if(!exists) {
					response.writeHead(404, {"Content-Type": "text/plain"});
					response.write("404 Not Found\n");
					response.end();
					return;
				}

				if (fs.statSync(filename).isDirectory()) filename += '/index.html';

				fs.readFile(filename, "binary", function(err, file) {
					if(err) {
						response.writeHead(500, {"Content-Type": "text/plain"});
						response.write(err + "\n");
						response.end();
						return;
					}

				var headers = {};
				var contentType = contentTypesByExtension[path.extname(filename)];
				if (contentType) headers["Content-Type"] = contentType;
					response.writeHead(200, headers);
					response.write(file, "binary");
					response.end();
				});
			});	
		});
  	});
  	server.listen(PORT);
}


