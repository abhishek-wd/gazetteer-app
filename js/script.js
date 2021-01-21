import { clearMap, mainMap, baseMaps } from './helper/mapLayers.js';
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
clearMap();
const map = L.map('mapId', { layers: [mainMap] }).fitWorld();

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);

let bounds = L.featureGroup(); // To store country bounds


/* ***** Getting User Location ***** */
map.locate({ setView: true, maxZoom: 5 });

map.on('locationfound', (e) => {

    const lat = e.latlng.lat, lng = e.latlng.lng;
    getFoundModal(lat, lng);

    // Highlighting the Current Country
    // Currently Disabling this to prevent reaching API call Limit

    // reverseGeocode(lat, lng).then(countryCode => {
    //     getCountryBounds(countryCode).then(countryBounds => {
    //         bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
    //         map.fitBounds(bounds.getBounds());
    //     });
    // });

    // Delete This Later - Not Required when above statements uncommented
    let countryCode = 'GB';
    getCountryBounds(countryCode).then(countryBounds => {
        bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
        map.fitBounds(bounds.getBounds());
    });
    map.addLayer(bounds);
});

map.on('locationerror', getErrorModal);


/* ***** Select Country from Dropdown ***** */
$('#country').change(() => {

    let countryName = $('#country').val();

    // Removing Previous Selected Country Bounds
    bounds.eachLayer(layer => bounds.removeLayer(layer));

    getCountryCode(countryName).then(countryCode => {
        getCountryBounds(countryCode).then(countryBounds => {
            bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
            map.fitBounds(bounds.getBounds());
        });
    });
    map.addLayer(bounds);
});

map.on('click', function (e) {
    $('#myModal').modal('show');
});