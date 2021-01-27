// Get Countries List from resources/countryBorders.geo.json
export let getCountryList = () => {
    return $.ajax({
        url: "php/countryList.php",
        type: 'GET',
        dataType: 'json',
        error: (jqXHR, textStatus, errorThrown) => console.error(`Couldn't Load Countries: ${textStatus} - ${errorThrown}`)
    }).then(result => result.data['features']);
}