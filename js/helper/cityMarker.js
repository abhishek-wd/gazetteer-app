export let getMarkers = (cities) => {
    let cityLayer = L.featureGroup();

    let icon = L.icon({
        iconUrl: 'images/city/city-small.png',
        iconSize: [20, 20]
    });


    cities.forEach(city => {
        let cityCoordinates = [city.latitude, city.longitude];

        L.marker(cityCoordinates)
            .bindTooltip(city.name).addTo(cityLayer);
        // console.log(city.name);
    });

    return cityLayer;
}

export let getCitiesMarkers = (cities, map) => {

    // Feature Groups for different types of Cities
    let mainCityLayer = L.featureGroup();
    let bigCityLayer = L.featureGroup();
    let smallCityLayer = L.featureGroup();
    let townLayer = L.featureGroup();

    // Function to remove existing layers
    let checkLayer = (layer) => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }

    checkLayer(mainCityLayer);
    checkLayer(bigCityLayer);
    checkLayer(smallCityLayer);
    checkLayer(townLayer);

    mainCityLayer = getMarkers(cities.main);
    map.addLayer(mainCityLayer);
    bigCityLayer = getMarkers(cities.big);
    smallCityLayer = getMarkers(cities.small);
    townLayer = getMarkers(cities.town);

    const cityLayers = {
        "Main": mainCityLayer,
        "Big": bigCityLayer,
        "Small": smallCityLayer,
        "Town": townLayer
    }

    $('<h6 id="cityTitle">Cities</h6>')
        .insertBefore('div.leaflet-control-layers-expanded>section.leaflet-control-layers-list>div.leaflet-control-layers-base');

    return cityLayers;
}

