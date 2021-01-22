// Get Countries List from resources/countryBorders.geo.json
export let getCountryList = () => {
    return $.ajax({
        url: "resources/countryBorders.geo.json",
        type: 'GET',
        dataType: 'json'
    }).then(result => result['features'].map(el => el.properties.name).sort());
}

// Get Country Code from resources/countryBorders.geo.json
export let getCountryCode = countryName => {
    return $.ajax({
        url: "resources/countryBorders.geo.json",
        type: 'GET',
        dataType: 'json'
    }).then(result => result['features'].filter(el => el.properties.name == countryName)[0].properties.iso_a2);
}

// Get Country Boundary coordinates from resources/countryBorders.geo.json
export let getCountryBounds = countryCode => {
    return $.ajax({
        type: "GET",
        url: "resources/countryBorders.geo.json",
        dataType: 'json'
    }).then(result => result['features'].filter(el => el.properties.iso_a2 == countryCode));
}

// Reverse Geocoding
export let reverseGeocode = (lat, lng) => {
    return $.ajax({
        type: "POST",
        url: "php/reverseGeocode.php",
        dataType: 'json',
        data: {
            lat: lat,
            lng: lng
        },
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(jqXHR.responseText);
            } else {
                console.error("Something went Wrong: " + errorThrown);
            }
        }
    }).then(result => result.data[0].components['ISO_3166-1_alpha-2']);
}