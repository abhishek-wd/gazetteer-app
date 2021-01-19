import { mainMap, wikiMap, darkMap, satMap } from './mapLayers.js';
import { onLocationFound, onLocationError } from './getCurrentLocation.js';

// Creating the Map 
const map = L.map('mapId', {
    center: [51.505, -0.09],// [27.72, 85.33],
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

map.on('click', function (e) {
    $('#myModal').modal('show');
})