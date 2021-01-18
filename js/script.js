/* Map Base Layers */

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

// Creating Tile Layers for Individual Maps
const mainMap = L.tileLayer(mapOpen, { attribution: attrOpen }), 
        wikiMap = L.tileLayer(mapWiki, { attribution: attrWiki }),
        satMap = L.tileLayer(mapSat, { attribution: attrSat }),
        darkMap = L.tileLayer(mapDark, { attribution: attrDark });


// Main Map 
const map = L.map('mapId', {
    center: [27.72, 85.33],
    zoom: 15,
   layers: [mainMap]
});

//const map = L.map('mapId').setView([27.72, 85.33], 15);
// mainMap.addTo(map);

var baseMaps = {
    "Default": mainMap,
    "Clear Mode": wikiMap,
    "Night Mode": darkMap,
    "Satellite": satMap
}

L.control.layers(baseMaps, null, {position: 'bottomleft'}).addTo(map);

// Changing the default position of Zoom Control and Opacity
map.zoomControl.setPosition('bottomright');
L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.4);
// L.DomUtil.addClass(map.zoomControl.getContainer(), 'zoom-control'); // Not Needed Anymore - Left for Reference

// L.tileLayer(mapUrl, { attribution }).addTo(map);


