var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

function success(pos) {
    var crd = pos.coords;

    // $("#alert-box")
    // .text(`Your Current Position is: Latitude: ${crd.latitude} Longitude: ${crd.longitude}`)
    // .removeClass("invisible");

    console.log('Your Current Position is:');
    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    // console.warn(`ERROR(${err.code}): ${err.message}`);

    jQuery(function($) { // Multiple jQuery Line inside javaScript Function
        $("#alert-box").text(`${err.message} <br> Please Choose a Country`);
        $("#alert-box").removeClass("invisible");
        $("#alert-box").fadeTo(500,1);

    }); 
}

navigator.geolocation.getCurrentPosition(success, error, options);