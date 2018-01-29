$("document").ready(function() {
	var txt = "";
	var auth = "";
	var reg = /\;/g;
	var getQuote = function() {
		$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",function(json) {
		txt = json.quoteText;
		auth = " -" + json.quoteAuthor;
		if(json.quoteAuthor==="") auth+="Unknown";
		$("#quote").html("<h2>"+txt+"</h2>");
		$("#author").html("<h3>"+auth+"</h3>");
		$(".box").fadeIn(300);
		});
	}
  
	getQuote();

	var sendTwit = function() {
		var rtxt = txt.replace(reg, '%3B');
		var rauth = auth.replace(reg, '%3B');
		window.open("https://twitter.com/intent/tweet?text="+rtxt+rauth);
	}
 
	$("#rand").on("click",function() {
		$(".box").fadeOut(200);
		getQuote(); 
	});
	$("#twitter").on("click", function() {
		sendTwit();
	});
});

/*
Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/ONjoLe/.

Rule #1: Don't look at the example project's code. Figure it out for yourself.

Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

User Story: I can click a button to show me a new random quote.

User Story: I can press a button to tweet out a quote.

Remember to use Read-Search-Ask if you get stuck.

When you are finished, click the "I've completed this challenge" button and include a link to your CodePen.

You can get feedback on your project by sharing it with your friends on Facebook.
*/