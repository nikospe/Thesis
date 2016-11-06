function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(37.9833333, 23.7333333);
    var mapOptions = ({
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
};