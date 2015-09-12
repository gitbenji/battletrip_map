
function initialize() 
{
var myOptions = {center: new google.maps.LatLng(42.2814, -83.7483),
 zoom: 12,
 mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
 
var coordinates = [[42.290895, -83.705983],[42.267687, -83.714981],[42.293469, -83.780727],[42.267243, -83.750257],
                [42.278230, -83.759012]];
for(var i=0; i<length.coordinates; i++) {
  var lat = coordinates[i,0];
  var lon = coordinates[0,i];
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    map: map
  });
}
 
}