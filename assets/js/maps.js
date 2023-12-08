function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 60.1282,
            lng: 18.6435
        }
    });


    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const locations = [
        { lat: 59.9793, lng: 18.8793 },
        { lat: 59.3611, lng: 17.9711 },
        { lat: 59.3344, lng: 18.0675 }
    ];

    const markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    const markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}
