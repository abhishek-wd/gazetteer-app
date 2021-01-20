import { mainMap, wikiMap, darkMap, satMap } from './mapLayers.js';
import { onLocationFound, onLocationError } from './getCurrentLocation.js';
import { getCountryList, getCountryCode } from './ajaxCalls.js';

// Creating the Select Menu
getCountryList().then(result => {
    result.forEach(country => {
        $("#country").append(new Option(country, country));
    })
});

// Creating the Map 
const map = L.map('mapId', {
    center: [51.505, -0.09],
    zoom: 15,
    layers: [mainMap]
});

// Map Layers to Add to Control
const baseMaps = {
    "Default": mainMap,
    "Clear Mode": wikiMap,
    "Night Mode": darkMap,
    "Satellite": satMap
}

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);

/* ***** Getting User Location ***** */

map.locate({ setView: true, maxZoom: 15 });

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

getCountryCode("Afghanistan");

map.on('click', function (e) {
    $('#myModal').modal('show');
});