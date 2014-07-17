
var data = [ {"profilePic": "/images/profile.png", "name": "You", "userName": "@ericsson"},
			{"profilePic": "/images/Friend1.jpg", "name": "Zachary Reardon", "userName": "31 mutual friends"},
			{"profilePic": "/images/Friend2.jpg", "name": "Mithla Tople", "userName": "15 mutual friends"},
			{"profilePic": "/images/Friend3.jpg", "name": "Kevin Sung", "userName": "0 mutual friends"},
			{"profilePic": "/images/Friend4.jpg", "name": "Prita Nigam", "userName": "10 mutual friends"},
			{"profilePic": "/images/content4.jpg", "name": "This Guy", "userName": "-1 mutual friends"},
			{"profilePic": "/images/twitter.png", "name": "Twitter", "userName": "1B mutual friends"}
			]

var Container = function(token) {

	this.addFilmStripItem(data);
}

Container.filmStripItemSize = 0;

Container.prototype.addFilmStripItem = function(d) { 
console.log(d);
	d.forEach( function(data, index) {
	console.log(data);
		$('#filmStripMenu').append(	
		$('<a href="#!" class="fixedFlexItem">\
			<div id="filmStripItem'+ Container.filmStripItemSize + '" class="filmStripItem active vertical fixedFlexItem flexContainer" onclick="$("#wrapper").toggleClass("noDisplay");">\
			<img src="' + data.profilePic +'" class="fixedFlexItem playListImage"></img>\
			<div id="friendContainer'+ Container.filmStripItemSize + '" class="friendContainer fixedFlexItem">\
				<p id="friendName'+ Container.filmStripItemSize + '" class="friendName">'+ data.name +'</p>\
				<p id="friendInfo'+ Container.filmStripItemSize + '" class="friendInfo">'+ data.userName +'</p>\
			</div>\
	</div>\
	</a>'));
	Container.filmStripItemSize++;
  }
  ); 
};
