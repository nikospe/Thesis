function allMaps(locations) {   
    var geocoder;
    var mapCanvas = document.getElementById('all_stores_map'); 
    geocoder = new google.maps.Geocoder();
    var marker, i;
    for (i = 0; i < locations.length; i++) {  
        geocoder.geocode( { 'address': locations[i]}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    var mapOptions = ({
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var map = new google.maps.Map(mapCanvas, mapOptions);
}