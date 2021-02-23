export let getMarkers = (cities) => {
    let cityLayer = L.featureGroup();

    let icon = L.icon({
        iconUrl: 'images/city/city-small.png',
        iconSize: [20, 20]
    });

    cities.forEach(city => {
        let cityCoordinates = [city.latitude, city.longitude];

        // console.log(city.latitude);
        // console.log(city.longitude);
        // console.log(city.name);
        L.marker(cityCoordinates)
            .bindTooltip(city.name).addTo(cityLayer);
    });

    return cityLayer;
}

// , { title: city.name, icon } 