// Normal Map

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapattr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tempLocation = [27.72, 85.33];

const map = L.map('map').setView(tempLocation, 10);

const firstLayer = L.tileLayer(mapUrl, { attribution: mapattr, maxZoom: 19});

map.addLayer(firstLayer);