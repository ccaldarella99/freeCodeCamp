$("document").ready(function() {
  //var WuKey = "e0b9056fad0627b0";
  var temp_f;
  var temp_c;
  var T = 0;
  
  var getCel = function(fahr) {
    var cel = ((fahr-32)*(50/9));
    cel = Math.round(cel);
    return cel/10;
  }

  $.ajax({
  url : "http://api.wunderground.com/api/e0b9056fad0627b0/geolookup/conditions/q/autoip.json",
  dataType : "jsonp",
  success : function(parsed_json) {
    var location = parsed_json['location']['city'];
    var state = parsed_json['location']['state']
    var wIcon = parsed_json['current_observation']['icon'];
    var iconUrl = "http://icons.wxug.com/i/c/k/" + wIcon + ".gif";
    temp_f = parsed_json['current_observation']['temp_f'];
    temp_c = getCel(temp_f);
//    alert("Current temperature in " + location + " is: " + temp_f + wIcon);
    T=0;
    $("#temp").html(temp_f + "&deg;F");
    $("#loc").html(location + ", " + state);
    $("#iconSrc").attr("src",iconUrl);
    $(".wBox").fadeIn(function() {});
  }
  });
  
  $("#togg").on('click',function() {
    $(".wBox").fadeOut(function() {
    if (T==0) {
      T=1;
      $("#temp").html(temp_c + "&deg;C");
      $("#cf").html("(Click here to see it in Celsius)");
    } else {
      T=0;
      $("#temp").html(temp_f + "&deg;F");
      $("#cf").html("(Click here to see it in Fahrenheit)");
    }
    });
    $(".wBox").fadeIn(function() {});
  });

});

/*

//var YOUR_SERVER_API_KEY = AIzaSyBo22L7F4fF-Njq_2MVAlxjYTB1f-U2et8;
//var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=23.714224,78.961452&key=YOUR_SERVER_API_KEY";

Show the Local Weather

Objective: Build a CodePen.io app that is functionally similar to this: http://codepen.io/FreeCodeCamp/full/bELRjV.

Rule #1: Don't look at the example project's code. Figure it out for yourself.

Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

User Story: I can see the weather in my current location.

User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

User Story: I can push a button to toggle between Fahrenheit and Celsius.

We recommend using the Open Weather API. This will require creating a free API key. Normally you want to avoid exposing API keys on CodePen, but we haven't been able to find a keyless API for weather.

Remember to use Read-Search-Ask if you get stuck.

When you are finished, click the "I've completed this challenge" button and include a link to your CodePen.

You can get feedback on your project by sharing it with your friends on Facebook.
*/