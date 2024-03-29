var map;
var blue = '#78B7AE';
var orange = '#FB621F';
var yellow = '#FEF200';
var offblack = '#1D1D1D';
var darkYellow = 'CCC000';
var black = '#000000';
var white = '#FFFFFF';
var circleArr = [];
var change;

// $(function() {
//   var mapOptions = {
//     zoom: 8,
//     center: new google.maps.LatLng(30.4390, -84.2653)
//   };
//   // var map = new google.maps.Map($("#map_canvas")[0], mapOptions);

//   // // listen for the window resize event & trigger Google Maps to update too
//   // $(window).resize(function() {
//   //   // (the 'map' here is the result of the created 'var map = ...' above)
//   //   google.maps.event.trigger(map, "resize");
//   // });
// });

$(document).ready(function() {
  var mapTypeId = "style_uno";
  change=1;//this is a test variable for timing of change being globally recognized

  //load map
  var myOptions = {center: new google.maps.LatLng(42.2814, -83.6983),
     zoom: 12,
     mapTypeControl: false,
     zoomControl: false,
     streetViewControl: false,
     panControl: false,
     mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, mapTypeId]
       },
       mapTypeId: mapTypeId
  };

  var mapStyles = [
      {
        featureType: 'water',
        stylers: [ 
          { color: blue }]
      },{
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'geometry',
        stylers: [ { color: offblack }]
      },{
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [ { color: offblack }]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [ {color: darkYellow}]
      },{
        featureType: 'poi.park',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.government',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.attraction',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.business',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [ {color: darkYellow}]
      },{
        featureType: 'administrative',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [ { weight: "0.5" }, { color: offblack }]
      },{
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.neighborhood',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.province',
        elementType: 'labels.text.fill',
        stylers: [ { color: orange }]
      }
  ];

  map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

  var styledMapOptions = {
  name: 'Style Uno'
  };

  var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);

  map.mapTypes.set(mapTypeId, customMapType);
  // infoWindow, markerOptions
  var renderOpt = {
    draggable: false,
    map: map,
    suppressMarkers: true,
    preserveViewport: true
  }

  //matt's shit for misses
  var url = 'http://battletrip.herokuapp.com/misses';
  $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    contentType: "application/json",
    success: function(result){
      //console.log(result);
      // initialize(result.arr);
    },
    error: function(xhr, textStatus, errThrown){
      console.log(errThrown);
    }
  });

  //shit for circles
  var url = 'http://battletrip.herokuapp.com/ships';
  $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    contentType: "application/json",
    success: function(result){
      console.log(result.arr);
      drawCircles(result.arr);
    },
    error: function(xhr, textStatus, errThrown){
      console.log(errThrown);
    }
  });

  //server calls for scoreboard
});

setTimeout(function(){
  console.log(change);
}, 2000);// here, change is globally recognized after 2 seconds

// function initialize(data) 
// {
// 	var coordinates = data;
//   console.log
    
// 	//plot flags
// 	for(var i=0; i<coordinates.length; i++) {
// 	  var lat = coordinates[i].lat;
// 	  var lon = coordinates[i].lon;
//     console.log(lat);
// 	  marker = new google.maps.Marker({
// 	    position: new google.maps.LatLng(lat, lon),
// 	    map: map
// 	  });
// 	}
// }

function drawCircles(data)
{
	var coordinates = data;
	//plot circles
	for(var i=0; i<coordinates.length; i++) {
		var lat = coordinates[i].lat;
	 	var lon = coordinates[i].lon;
	 	var radius = coordinates[i].radius;
		var circle = new google.maps.Circle({
			strokeColor: 'orange',
		    strokeOpacity: 0.8,
		    strokeWeight: 1.5,
		    fillColor: 'orange',
		    fillOpacity: 0.6,
	    	map: map, 
	    	center: {lat: lat, lng: lon},
	    	radius: radius
		  });
    circleArr.push(circle);
	}
  //fake circle
  // var circle = new google.maps.Circle({
  //     strokeColor: 'orange',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 1.5,
  //       fillColor: 'orange',
  //       fillOpacity: 0.6,
  //       map: map,
  //       center: {lat: 30.4590, lng: -84.2643},
  //       radius: 1500
  //   });
  // circleArr.push(circle);

  // var circle = new google.maps.Circle({
  //     strokeColor: 'orange',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 1.5,
  //       fillColor: 'orange',
  //       fillOpacity: 0.6,
  //       map: map,
  //       center: {lat: 30.4790, lng: -84.2843},
  //       radius: 1200
  //   });
  // circleArr.push(circle);

  // var circle = new google.maps.Circle({
  //     strokeColor: 'orange',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 1.5,
  //       fillColor: 'orange',
  //       fillOpacity: 0.6,
  //       map: map,
  //       center: {lat: 30.4190, lng: -84.3143},
  //       radius: 1600
  //   });
  // circleArr.push(circle);
}

//set header width
function headersize() {
  var docWidth = $(window).width();
  var headWidth = docWidth - 20;

  var killheader = document.getElementById("header");
  killheader.style.width = headWidth + "px";
  //console.log(docWidth, headWidth, header);
}

headersize();

//set header to width of window on resize
window.onresize = function(event) {
  headersize();
}

function scoreboardsize() {
  var docHeight = $(window).height();
  var header = document.getElementById('header');
  var headHeight;
  headHeight = header.height;
  console.log(docHeight, headHeight, header);
  //var scoreboard = document.getElementById('scoreboard');
  //var scoreHeight = docHeight - headHeight;
  //scoreboard.style.height = scoreHeight;
}

scoreboardsize();


var scores = {
  arr: [
    {
      name: 'Jack',
      score: '9001'
    },
    {
      name: 'Bill Nye',
      score: '8960'
    },
    {
      name: 'George Washington',
      score: '8756'
    }
  ]
};

var board = document.getElementById("scoreboard");
console.log(scores.arr[0].name);

//create scoreboxs
//add in place number
for(var i=0; i<scores.arr.length; i++) {
  var j = i + 1;
  var divString = '<div class="scorebox" id="scorebox-' + i + '"></div>';
  var scoreName = '<span class="scorename">' + scores.arr[i].name + '</span>';
  var scorePoints = '<span class="scorepoints">' + scores.arr[i].score + '</span>';
  var scorePosition = '<span class="scoreposition">' + j + '</span>';

  board.innerHTML += divString;
  var classString = 'scorebox-' + i;
  var scorebox = document.getElementById(classString);
  scorebox.innerHTML += scoreName;
  scorebox.innerHTML += scorePoints;
  scorebox.innerHTML += scorePosition;
}
