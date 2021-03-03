export let getMarkers = (cities, type) => {
    let cityLayer = L.featureGroup();

    const getSize = type => {
        return type == "main" ? [40, 40] :
            type == "big" ? [35, 35] :
                type == "small" ? [30, 30] :
                    [25, 25];
    }

    let icon = L.icon({
        iconUrl: `images/city/${type}.png`,
        iconSize: getSize(type)
    });

    cities.forEach(city => {
        let cityCoordinates = [city.latitude, city.longitude];

        L.marker(cityCoordinates, { icon })
            .bindTooltip(city.name).bindPopup(`${city.name} <br> ${city.population}`).addTo(cityLayer);
        console.log(city);
    });
    return cityLayer;
}
