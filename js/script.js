import { mainMap, baseMaps } from './helper/mapLayers.js';
import { boundStyle } from './helper/styles.js';
import { sanitizeName } from './helper/sanitizeName.js';
import { getErrorModal, getInfoModal, resetModal } from './helper/modal.js';

import { getCountryList } from './calls/countryList.js';
import { getReverseGeocode } from './calls/reverseGeocode.js';
import { getCountryInfo } from './calls/countryInfo.js';
import { getHolidays } from './calls/holidays.js';
import { getNews } from './calls/news.js';
import { getExchangeRate } from './calls/exchangeRate.js';
import { getFlightDetails } from './calls/flights.js'
import { getIataCode } from './calls/iataCode.js';

/* ***** Creating the Select Menu ***** */
getCountryList().then(result => {
    let countries = result.map(el => el.properties.name).sort();
    countries.forEach(country => {
        $("#country").append(new Option(country, country));
    });
});

/* ***** Creating the Map ***** */
const map = L.map('mapId', { layers: [mainMap] }).fitWorld();

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);

let bounds = L.featureGroup(); // To store country bounds

// Highlight Country Bounds
let highlightBounds = countryBounds => {
    bounds.eachLayer(layer => bounds.removeLayer(layer)); //Remove Previous Bounds

    bounds.addLayer(L.geoJSON(countryBounds, { style: boundStyle }));
    map.fitBounds(bounds.getBounds());
    map.addLayer(bounds);
}

// Get Modal Containing Country Info
let displayInfo = countryCode => {
    getCountryInfo(countryCode).then(country => {
        // console.log(country);
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

/* ***** Getting User Location ***** */
map.locate({ setView: true, maxZoom: 5 });

map.on('locationfound', (e) => {
    getReverseGeocode(e.latlng.lat, e.latlng.lng).then(countryCode => {
        getCountryList().then(result => {
            let countryBounds = result.filter(el => el.properties.iso_a2 == countryCode);
            highlightBounds(countryBounds);
            displayInfo(countryCode);
        });
    });
});

map.on('locationerror', getErrorModal);

/* ***** Select Country from Dropdown ***** */
$('#country').change(() => {
    // $('#my-modal').on('show.bs.modal', resetModal);
    resetModal();
    let countryName = $('#country').val();

    getCountryList().then(result => {
        let countryBounds = result.filter(el => el.properties.name == countryName);
        highlightBounds(countryBounds);
        displayInfo(countryBounds[0].properties.iso_a2);
    })
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
