import { mainMap, baseMaps } from './helper/mapLayers.js';
import { boundStyle } from './helper/styles.js';
import { onLocationFound, onLocationError } from './getCurrentLocation.js';
import { getCountryList, getCountryCode, getCountryBounds } from './ajaxCalls.js';

/* ***** Creating the Select Menu ***** */
getCountryList().then(result => {
    result.forEach(country => {
        $("#country").append(new Option(country, country));
    })
});

/* ***** Creating the Map ***** */
const map = L.map('mapId', { layers: [mainMap] }).fitWorld();

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);

/* ***** Getting User Location ***** */

map.locate({ setView: true, maxZoom: 5 });

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

/* ***** Highlighting the Current Country ***** */
let countryCode = 'GB'; // Need to work on how to get this

getCountryBounds(countryCode).then(countryBounds => {
    L.geoJSON(countryBounds, { style: boundStyle }).addTo(map);
    map.fitBounds(countryBounds.getBounds());
});

// const coords = map.getCenter();
// console.log(coords);


/* Next Section */

$('#country').change(() => {

    let countryName = $('#country').val();
    let countryBounds;

    getCountryCode(countryName).then(countryCode => {
        getCountryBounds(countryCode).then(bounds => {
            countryBounds = bounds;
        });
    });
});

L.geoJSON(countryBounds, { style: boundStyle }).addTo(map);
console.log(countryBounds);
console.log(countryBounds.getBounds());

map.on('click', function (e) {
    $('#myModal').modal('show');
});