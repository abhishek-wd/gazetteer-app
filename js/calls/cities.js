import { getMarkers } from "../helper/cityMarker.js";

export let getCities = (countryCode) => {

    return $.ajax({
        type: "GET",
        url: "php/cities.php",
        dataType: 'json',
        data: {
            countryCode
        },
        success: function (result) {
            console.log(result);
            // return getMarkers(result.data);
        },
        error: (jqXHR, textStatus, errorThrown) => console.error(`Cities Not Found: ${textStatus} - ${errorThrown}`)
    })//.then(result => getMarkers(result.data));
}