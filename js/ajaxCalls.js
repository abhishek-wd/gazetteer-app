// Reverse Geocoding

export function reverseGeocode(lat, lng) {
    return $.ajax({
        url: "php/reverseGeocode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            lng: lng
        },
        success: function (result) {
            return result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(jqXHR.responseText);
            } else {
                console.error("Something went Wrong" + errorThrown);
            }
        }
    });
}