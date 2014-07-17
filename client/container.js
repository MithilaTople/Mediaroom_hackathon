

var container = function(token) {

	var self = this;
	jQuery.ajax( {
		  url: 'http://127.0.0.1:1337/update/friends?token=' + token, //?service=' + serviceName + '&date_range=YYYY-MM-DD HH:MM:SS.0 YYYY-MM-DD HH:MM:SS.0',

		  contentType: 'application/json',
		  type: "GET",	  //crossDomain: "true",
		  //jsonpCallback: 'jsonpCallback',
		  //dataType: "json",
		  async: false,
		  //jsonp: "jsonp",

		  success: function(d) {
			 console.log('Ajax old get data was a success');
			 d = JSON.parse(d);
			 self.addFilmStripItem(d);
		  },

		  error: function(xhr, status, errthrwn) {
			 console.log("Ajax call failed " + status + " " + errthrwn);
			 //console.log(xhr.getResponseHeader());
		  }

	})
}

container.filmStripItemSize = 0;

container.prototype.addFilmStripItem = function(d) { 
	d.forEach( function(data, index) {
		$('#filmStrip').append(	
		'<a href="#!" class="fixedFlexItem">\
			<div id="filmStripItem'+ container.filmStripItemSize + '" class="filmStripItem active vertical fixedFlexItem flexContainer" onclick="$("#wrapper").toggleClass("noDisplay");">\
			<img src="' + data.profilePic +'" class="fixedFlexItem"></img>\
			<div id="friendContainer'+ container.filmStripItemSize + '" class="friendContainer fixedFlexItem">\
				<p id="friendName'+ container.filmStripItemSize + '" class="friendName">'+ data.name +'</p>\
				<p id="friendInfo'+ container.filmStripItemSize + '" class="friendInfo">'+ data.userName +'@ZacharyReardon</p>\
			</div>\
	</div>\
	</a>');
	container.filmStripItemSize++;
  }
  ); 
};
