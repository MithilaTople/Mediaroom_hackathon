var fs = require('fs'),
    readline = require('readline'),
              url = require('url'),
              http = require('http');

var file = {};
var request = require('request');
var https = require('https');
var responseBody = {series: []}

var dbLogName = {
                                                                     "IIS" : "noc_iis_logs",
                                                                     "ClientLog" : "client_logs"
                                                       }
var fileToMIME = {
                                                                     'js' : 'text/javascript',
                                                                     'css' : 'text/css',
                                                                     'html' : 'text/html',
                                                       }
                                                       

var fsOpenSuccess = function(err, fd) {
   console.log("file open err = " + err);
   file.fd = fd;
}

http.createServer(function (req, res) {
  var stringBuffer;

  /*if(req.method === 'GET' && req.url)
              res.end('Get\n' + req.url);

  else if(req.method === 'POST')
              res.end('Post\n');
  else
    res.end(req.method);
  */
  /*if (!file.fd)
              fs.openSync("./test.txt", fsOpenSuccess)
  fs.read(file.fd, stringBuffer, 0,
  */
  //console.log();
  //console.log();
  //console.log("called");
  console.log('url = ' + req.url);
  //console.log(url.parse(req.url, true));
  console.log(url.parse(req.url, true).query);
  var holder = url.parse(req.url, true);
  var pathname = holder.pathname;
  console.log(pathname);
  console.log("req.method: " +req.method);
  var query = holder.query;
  if(req.method === 'GET' && pathname === '/') {
    console.log("--------- Sending Home Page ---------");
		res.writeHeader(200, {"Content-Type": "text/html"});
        res.end(fs.readFileSync('Hackathon_MainScreen.html')); // changed it here
        return;
  } 
  else if(req.method === 'GET' && pathname ==! '/') {
    console.log("--------- Sending Home Page ---------");
    res.writeHeader(200, {"Content-Type": "text/html"});
              res.end(fs.readFileSync(pathname)); // changed it here
              return;
  }
  else if(req.method === 'GET' && pathname !== '/update/general') {
              console.log("--------- Sending Resource ---------");

              
              res.writeHeader(200, {"Content-Type": fileToMIME[req.url.split('.').pop()]});
              
              res.end(fs.readFileSync('.' + req.url));
              return;
  }else if(req.method == "POST" && pathname === '/register'){
		console.log("registering");
				
		var str = '';

  //another chunk of data has been recieved, so append it to `str`
  req.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  req.on('end', function () {
    console.log(str);
	var result = str.toString().split("=");
	console.log("acessToken " +result[2]);

	var options = {
			   host : 'graph.facebook.com',
			   path: '/me?access_token='+result[2],
			   method: 'GET'
 };
 
 callback = function(response)
 {
			   var str = '';

			   response.on('data', function(chunk){
							 str+=chunk
			   });

			   response.on('end', function(){
							 console.log("str "+str);
							 fs.writeFile('profile.png', str, function (err) {
							  if (err) throw err;
							  console.log('It\'s saved!');
							});
			   
			   });
 }
 
	https.request(options,callback).end();
	var download = function(uri, filename, callback){
		request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};

	download('https://graph.facebook.com/me/picture?type=large&access_token='+result[2], './images/profile.png', function(){
	console.log('done');
	});
 
	
  });
	
		
		res.writeHeader(200, {"Content-Type": "text/html", "Cache-control": "private, max-age=60000"});
        res.end(fs.readFileSync('Hackathon_MainScreen.html')); // changed it here
        return;
  }
	
	
  //send update
  
  console.log("Waiting.......");
}).listen(1337, '127.0.0.1');

/*
fs.readFile('../../node_modules/rickshaw/Rickshaw/Rickshaw Example Project/Tutorial.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});*/

console.log('Server running at http://127.0.0.1:1337/');
