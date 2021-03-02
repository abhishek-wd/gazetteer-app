import { getMarkers } from "../helper/cityMarker.js";

export let getCities = (countryCode) => {

    return $.ajax({
        type: "GET",
        url: "php/cities.php",
        dataType: 'json',
        data: {
            countryCode
        },
        success: result => {
            console.log(result);
            // const cities = result.data;

            // let mainCityLayer = getMarkers(cities.main);
            // let bigCityLayer = getMarkers(cities.big);
            // let smallCityLayer = getMarkers(cities.small);
            // let townLayer = getMarkers(cities.town);

            // const cityLayers = {
            //     "Main": mainCityLayer,
            //     "Big": bigCityLayer,
            //     "Small": smallCityLayer,
            //     "Town": townLayer
            // }




        },
        error: (jqXHR, textStatus, errorThrown) => console.error(`Cities Not Found: ${textStatus} - ${errorThrown}`)
    })
    // .then(result => {
    //     const cities = result.data;

    //     let mainCityLayer = getMarkers(cities.main);
    //     let bigCityLayer = getMarkers(cities.big);
    //     let smallCityLayer = getMarkers(cities.small);
    //     let townLayer = getMarkers(cities.town);

    //     const cityLayers = {
    //         "Main": mainCityLayer,
    //         "Big": bigCityLayer,
    //         "Small": smallCityLayer,
    //         "Town": townLayer
    //     }

    //     return L.control.layers(cityLayers); //collapsed: false cityLayers, { position: 'bottomleft' }
    //     // return cityControl;

    //     // return cityLayers;
    // });
}








