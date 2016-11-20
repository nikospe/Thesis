function storeMap(address, id) {
    var mapCanvas = document.getElementById(id);    
    var geocoder;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    var mapOptions = ({
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var map = new google.maps.Map(mapCanvas, mapOptions);
};