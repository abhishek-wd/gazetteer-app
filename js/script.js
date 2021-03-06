import { getCitiesMarkers } from './main/cityMarker.js';
import { mainMap, baseMaps } from './main/mapLayers.js';
import * as button from './main/buttonLayer.js';

import { boundStyle } from './helper/styles.js';
import { sanitizeName } from './helper/sanitize.js';
import { getErrorModal, getInfoModal, resetModal, resetCovidModal } from './helper/modal.js';

import { getCountryList } from './calls/countryList.js';
import { getReverseGeocode } from './calls/reverseGeocode.js';
import { getCountryInfo } from './calls/countryInfo.js';
import { getHolidays } from './calls/holidays.js';
import { getNews } from './calls/news.js';
import { getExchangeRate } from './calls/exchangeRate.js';
import { getFlightDetails } from './calls/flights.js'
import { getIataCode } from './calls/iataCode.js';
import { getCities } from './calls/cities.js';
import { fillCovidData, getCovidData } from './calls/covid.js';

/* ***** Creating the Select Menu ***** */
getCountryList().then(result => {
    let countries = result.map(el => el.properties.name).sort();
    countries.forEach(country => {
        $("#country").append(new Option(country, country));
    });
});

getCovidData();

/* ***** Creating the Map ***** */
const map = L.map('mapId', { layers: [mainMap] }).fitWorld();

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);

// Adding the easy buttons
button.infoButton.addTo(map);
button.covidButton.addTo(map);
// button.populationButton.addTo(map);
// button.starButton.addTo(map);

/* ***** Variables and Methods ***** */

let cityControl = L.control.layers(null, null, { position: 'bottomright', collapsed: false });
let bounds = L.featureGroup(); // To store country bounds

// Highlight Country Bounds
let highlightBounds = countryBounds => {
    bounds.eachLayer(layer => bounds.removeLayer(layer)); //Remove Previous Bounds
    bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
    //map.fitBounds(bounds.getBounds());
    map.flyToBounds(bounds.getBounds());
    map.addLayer(bounds);
}

// Get Modal Containing Country Info
let displayInfo = countryCode => {
    getCountryInfo(countryCode).then(country => {
        const countryCode = country.alpha2Code;
        if (country.status != 404) {
            getExchangeRate(country.currencies[0].code);
            getHolidays(countryCode);
            getIataCode(countryCode, country.capital).then(airports => getFlightDetails(airports));
            getNews(sanitizeName(country.name));
        }
        getInfoModal();
    });
}

// Show cities on map
let showCities = cities => {
    // Remove pre-existing Control and it's title
    map.removeControl(cityControl);
    $("#cityTitle").remove();

    let cityLayers = getCitiesMarkers(cities, map);
    cityControl = L.control.layers(null, cityLayers, { position: 'bottomright', collapsed: false }).addTo(map);

    //Title for the city control at top of layer control
    $('<h6 id="cityTitle">Cities</h6>')
        .insertBefore('div.leaflet-control-layers-expanded>section.leaflet-control-layers-list>div.leaflet-control-layers-base');
}

/* ***** Getting User Location ***** */
map.locate({ setView: true, maxZoom: 5 });

map.on('locationfound', (e) => {
    getReverseGeocode(e.latlng.lat, e.latlng.lng).then(countryCode => {
        getCountryList().then(result => {
            let countryBounds = result.filter(el => el.properties.iso_a2 == countryCode);
            highlightBounds(countryBounds);
            // displayInfo(countryCode);
            // getCities(countryCode).then(result => showCities(result.data));
        });
    });
});

map.on('locationerror', getErrorModal);

/* ***** Select Country from Dropdown ***** */
$('#country').change(() => {
    resetModal();
    resetCovidModal();
    let countryName = $('#country').val();

    getCountryList().then(result => {
        let countryBounds = result.filter(el => el.properties.name == countryName);
        const countryCode = countryBounds[0].properties.iso_a2;
        highlightBounds(countryBounds);
        // displayInfo(countryCode);
        // getCities(countryCode).then(result => showCities(result.data));
        fillCovidData(countryName);
    });
});

/* ***** Click a Country on Map ***** */
map.on('click', e => {
    // getReverseGeocode(e.latlng.lat, e.latlng.lng).then(countryCode => {
    //     getCountryList().then(result => {
    //         let countryBounds = result.filter(el => el.properties.iso_a2 == countryCode);
    //         highlightBounds(countryBounds);
    //         displayInfo(countryCode);
    //     });
    // });
    // To check modal
    $('#my-modal').modal('show');
});
