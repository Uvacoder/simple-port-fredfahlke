if ( $('body').attr('id') === 'home' ){
	//Twitter Call
	// $(document).ready(function() {
		// $.getJSON('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=manikrathee&count=1', function(data) {

		// 	var html = "<div>";
		// 	var twitter = $('.twitter');

		// 	for(var i=0; i<data.length; i++) {

		// 		// create URLs and link @Mentions
		// 		var status = data[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		// 		      return '<a href="'+url+'">'+url+'</a>';
		// 		    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
		// 		      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		// 		    });

		// 		// set relative time - function source by Alex Hedley
		// 		var time_value = data[i].created_at
		//         var relative = '';

		// 		function relative_time(time_value) {
		// 	        var values = time_value.split(" ");
		// 	        time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
		// 	        var parsed_date = Date.parse(time_value);
		// 	        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
		// 	        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
		// 	        delta = delta + (relative_to.getTimezoneOffset() * 60);

		// 	        if (delta < 60) {
		// 	            relative = 'a minute ago';
		// 	        } else if (delta < 120) {
		// 	            relative = 'couple of minutes ago';
		// 	        } else if (delta < (45 * 60)) {
		// 	            relative = (parseInt(delta / 60)).toString() + ' minutes ago';
		// 	        } else if (delta < (90 * 60)) {
		// 	            relative = 'an hour ago';
		// 	        } else if (delta < (24 * 60 * 60)) {
		// 	            relative = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
		// 	        } else if (delta < (48 * 60 * 60)) {
		// 	            relative = '1 day ago';
		// 	        } else {
		// 	            relative = (parseInt(delta / 86400)).toString() + ' days ago';
		// 	        }

		// 	        return relative;
		// 	    }
		// 		// Run relative time and apply var
		// 		relative_time(time_value);

		// 		// Concatenate tweet and add linked relative time
		//     	html += "<p> " + status + ' - <a href="http://www.twitter.com/manikrathee/statuses/' + data[i].id_str + '" title="View this Tweet on Twitter.com">' + relative + "</a></span></p>";
		// 	}
		// 	html += "</div>"

			// Spit out the final product
	    	// twitter.html(html);
	    	// logofyAPI();
		// });
	// });

	$(document).ready(function() {
		$('#twitter-api-bar').load('OAuth/twitter-auth.php');
		// logofyAPI();
		// centerAPI();
	});
}
