export let getReverseGeocode = (lat, lng) => {
    return $.ajax({
        type: "POST",
        url: "php/reverseGeocode.php",
        dataType: 'json',
        data: {
            lat, lng
        },
        success: result => {
            if (result.status.message == 'OK') {
                let timezone = result.data[0].annotations.timezone;
                $('#time-zone').text(`${timezone.short_name} ${timezone.offset_string}`);
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(`Bad Request: ${jqXHR.responseText}`);
            } else {
                console.error(`Reverse Geocode Not Found: ${textStatus} - ${errorThrown}`);
            }
        }
    }).then(result => result.data[0].components['ISO_3166-1_alpha-2']);
}
