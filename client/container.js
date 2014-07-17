

var container = function(token) {

	jQuery.ajax( {
		  url: 'http://127.0.0.1:1337/update/friends', //?service=' + serviceName + '&date_range=YYYY-MM-DD HH:MM:SS.0 YYYY-MM-DD HH:MM:SS.0',

		  contentType: 'application/json',
		  type: "GET",	  //crossDomain: "true",
		  //jsonpCallback: 'jsonpCallback',
		  //dataType: "json",
		  async: false,
		  //jsonp: "jsonp",

		  success: function(d) {
			 console.log('Ajax old get data was a success');
			 //d = JSON.parse(d);
			 console.log(d);
			 d.series.forEach(function(element,i) {
				element.x = parseInt(element.time);
				element.y = parseInt(element.latency);
			 })
			 console.log(d);
			 self.data = d.series;
			 console.log(d.series[0].x);
			 wait = 0;
			 console.log("length "+d.series.length);
			 if (d.series.length === 0) {
				console.log("NO VALUES COMING IN");
				d.series[0] = {};
				d.series[0].x = 0;
				d.series[0].y = 0;
			}
			 //graph.update();
		  },

		  error: function(xhr, status, errthrwn) {
			 console.log("Ajax call failed " + status + " " + errthrwn);
			 //console.log(xhr.getResponseHeader());
			 wait = 0;
		  }

	})
}

container.filmStripItemSize = 0;

container.prototype.addFilmStripItem = function(d) { 
	  d.forEach function(data, index) {
    $('#filmStrip').append("<div id=filmStripItem"+container.filmStripItemSize+" class='filmStripItem active vertical fixedFlexItem flexContainer'>"+"<button class='showFriend'>"+"<img src="+profPic+"class='fixedFlexItem></img>"+"<div id='friendContainer'"+container.filmStripItemSize+" class='friendContainer fixedFlexItem'>"+"<p id=friendName"+container.filmStripItemSize+" class='friendName'>"+name+"</p>'+'<p id=friendName"+container.filmStripItemSize+" class='friendInfo'>"+userName"</p>"+"</button>")
  }
  ); 
};
