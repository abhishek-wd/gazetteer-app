import { mainMap, baseMaps } from './helper/mapLayers.js';
import { boundStyle } from './helper/styles.js';
import { getFoundModal, getErrorModal } from './helper/modal.js';
import { getCountryList, getCountryCode, getCountryBounds, reverseGeocode } from './ajaxCalls.js';

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

let bounds = L.featureGroup(); // To store country bounds

// Function to Highlight the Country Bounds
let highlightBounds = countryCode => {
    bounds.eachLayer(layer => bounds.removeLayer(layer)); //Remove Previous Bounds

    getCountryBounds(countryCode).then(countryBounds => {
        bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
        map.fitBounds(bounds.getBounds());
    });
}

/* ***** Getting User Location ***** */
map.locate({ setView: true, maxZoom: 5 });

map.on('locationfound', (e) => {
    const lat = e.latlng.lat, lng = e.latlng.lng;
    getFoundModal(lat, lng);
    reverseGeocode(lat, lng).then(countryCode => highlightBounds(countryCode));
    map.addLayer(bounds);
});

map.on('locationerror', getErrorModal);


/* ***** Click a Country on Map ***** */
map.on('click', (e) => {
    reverseGeocode(e.latlng.lat, e.latlng.lng).then(countryCode => highlightBounds(countryCode));
});


/* ***** Select Country from Dropdown ***** */
$('#country').change(() => {
    let countryName = $('#country').val();

    getCountryCode(countryName).then(countryCode => highlightBounds(countryCode));
    map.addLayer(bounds);
});
