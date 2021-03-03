export let getCities = (countryCode) => {
    return $.ajax({
        type: "GET",
        url: "php/cities.php",
        dataType: 'json',
        data: {
            countryCode
        },
        error: (jqXHR, textStatus, errorThrown) => console.error(`Cities Not Found: ${textStatus} - ${errorThrown}`)
    });
}








