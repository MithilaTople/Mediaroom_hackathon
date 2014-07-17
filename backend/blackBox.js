
var http = require("http");

http.createServer(function(request, response) {

	var url = request.url;
	if(request.method === 'GET' && url === '/req/update/friends')
	{	
	}
	else if(request.method == 'GET' && url == '/req/update/friendInfo')
	{
	}
	else if(request.method == 'POST' && url == '/req/register' )
	{
		request.on('data', function(chunk) {
	    	console.log("Received body data:");
	    	var chunkStr = chunk.toString();

	    	var arr = chunkStr.split("\n");
	    	var social; var token;
	    	if( arr[0].toLowerCase().indexOf("fb") > -1 )
	    	{
	    		social = "FB";
	    	}
	    	else if (arr[0].toLowerCase().indexOf("ig") > -1)
	    	{
	    	  	social = "IG";
	    	}
	    	else
	    	{
	    	  	console.log("Bad social");
	    	}
	    	
	    	console.log(social);

	    	if( arr[1].toLowerCase().indexOf("token") > -1 )
	    	{
	    	  	token = arr[1].split(":")[1].trim();
	    	  	console.log(token);
	    	}
	    	else
	    	{
	    	  	console.log("Bad token");    	 
	    	}
    	  		
			/* make the API call */
			FB.api("/friendlist", get, token, function (response) {
		    	if (response && !response.error) {
		        	console.log("Got response back from FB");
		    	}
			});
		});
	}


  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end();
}).listen(1337);