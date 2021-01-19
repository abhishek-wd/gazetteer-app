import { resetModal } from './reset.js';
import { reverseGeocode } from './ajaxCalls.js';

/* ***** Map Base Layers ***** */

// Open Street Map
const mapOpen = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attrOpen = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Wiki Map
const mapWiki = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
const attrWiki = '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>';

// Satellite Map
const mapSat = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const attrSat = 'Tiles &copy; Esri &mdash;';

// Night Map
const mapDark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const attrDark = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Toner - can only be added as layer to another map
const tileToner = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}';
const attrToner = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/* ***** Creating The Map ***** */

// Individual Tile Layers
const mainMap = L.tileLayer(mapOpen, { attribution: attrOpen }),
    wikiMap = L.tileLayer(mapWiki, { attribution: attrWiki }),
    satMap = L.tileLayer(mapSat, { attribution: attrSat }),
    darkMap = L.tileLayer(mapDark, { attribution: attrDark });

// if (map != undefined) {
//     map.remove();
// }
// Actual Map 
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
// L.DomUtil.addClass(map.zoomControl.getContainer(), 'zoom-control'); // Not Needed Anymore - Left for Reference


/* ***** Getting User Location ***** */

map.locate({ setView: true, maxZoom: 15 });

// If Success
function onLocationFound(e) {
    const lat = e.latlng.lat, lng = e.latlng.lng;

    let countryISO;

    reverseGeocode(lat, lng).done(function (result) {
        countryISO = result[0]['CountryId'];
    }).done(function () {
        $('.modal-header').addClass('bg-success');
        $('.modal-title').text('Location Detected');
        $('#data-body').html(`Latitude: ${e.latlng.lat} <br> Longitude:
         ${e.latlng.lng} <br> You Are In: ${countryISO}`).addClass('text-success');
        $('.modal-footer button').addClass('btn-outline-success');
        $('#myModal').modal('show');

        // Closing the modal in 2 second, if not closed
        setTimeout(function () {
            $('#myModal').modal('hide');
        }, 2000);

        // Removing the temporarily added class
        $('#myModal').on('hide.bs.modal', function () {
            resetModal();
        });
    });
}

// If Failure
function onLocationError(e) {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`);
    $('#data-body').text(e.message).addClass('text-warning');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#myModal').modal('show');

    // Closing the modal in 2 second, if not closed
    setTimeout(function () {
        $('#myModal').modal('hide');
    }, 2000);

    // Removing the temporarily added class
    $('#myModal').on('hide.bs.modal', function () {
        resetModal();
    });
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.on('click', function (e) {
    $('#myModal').modal('show');
})