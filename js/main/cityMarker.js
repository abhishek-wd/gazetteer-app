import { getMarkers } from '../helper/marker.js';

// Feature Groups for different types of Cities
let mainCityLayer = L.featureGroup();
let bigCityLayer = L.featureGroup();
let smallCityLayer = L.featureGroup();
let townLayer = L.featureGroup();

export let getCitiesMarkers = (cities, map) => {
    // Creating an array so it's easy to iterate over the different layers
    let layersArray = [mainCityLayer, bigCityLayer, smallCityLayer, townLayer];

    layersArray.forEach(layer => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });

    mainCityLayer = getMarkers(cities.main, "main");
    map.addLayer(mainCityLayer);
    bigCityLayer = getMarkers(cities.big, "big");
    smallCityLayer = getMarkers(cities.small, "small");
    townLayer = getMarkers(cities.town, "town");

    const cityLayers = {
        "Main": mainCityLayer,
        "Big": bigCityLayer,
        "Small": smallCityLayer,
        "Town": townLayer
    }
    return cityLayers;
}
