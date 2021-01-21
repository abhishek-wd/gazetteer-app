// Get Countries List from resources/countryBorders.geo.json
export function getCountryList() {
    return $.ajax({
        url: "resources/countryBorders.geo.json",
        type: 'GET',
        dataType: 'json'
    }).then(result => {
        const countryList = result['features'].map((el) => {
            return el.properties.name;
        }).sort();
        return countryList;
    });
}

// Get Country Code from resources/countryBorders.geo.json
export function getCountryCode(countryName) {
    return $.ajax({
        url: "resources/countryBorders.geo.json",
        type: 'GET',
        dataType: 'json'
    }).then(result => {
        const countryCode = result['features'].filter((el) => {
            return el.properties.name == countryName;
        })[0].properties.iso_a2;
        return countryCode;
    })
}

// Get Country Boundary coordinates from resources/countryBorders.geo.json
export function getCountryBounds(countryCode) {

    return $.ajax({
        type: "GET",
        url: "resources/countryBorders.geo.json",
        // async: false,
        dataType: 'json'
    }).then(result => {
        console.log('Received Country code:' + countryCode);
        var countryBounds = result['features'].filter((el) => {
            return el.properties.iso_a2 == countryCode;
        });
        return countryBounds;
    });
}
// Reverse Geocoding

// export function reverseGeocode(lat, lng) {
//     return $.ajax({
//         url: "php/reverseGeocode.php",
//         type: 'POST',
//         dataType: 'json',
//         data: {
//             lat: lat,
//             lng: lng
//         },
//         success: function (result) {
//             return result;
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             if (jqXHR.status && jqXHR.status == 400) {
//                 console.debug(jqXHR.responseText);
//             } else {
//                 console.error("Something went Wrong" + errorThrown);
//             }
//         }
//     });
// }

