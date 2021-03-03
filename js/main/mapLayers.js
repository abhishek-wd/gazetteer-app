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

// Individual Tile Layers
const mainMap = L.tileLayer(mapOpen, { attribution: attrOpen }),
    wikiMap = L.tileLayer(mapWiki, { attribution: attrWiki }),
    satMap = L.tileLayer(mapSat, { attribution: attrSat }),
    darkMap = L.tileLayer(mapDark, { attribution: attrDark });

// Map Layers to Add to Control
const baseMaps = {
    "Default": mainMap,
    "Clear Mode": wikiMap,
    "Night Mode": darkMap,
    "Satellite": satMap
}

export { mainMap, baseMaps }