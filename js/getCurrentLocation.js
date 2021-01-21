import { getCountryBounds } from './ajaxCalls.js';
import { boundStyle } from './helper/styles.js';
import { resetModal } from './helper/modal.js';
// import { reverseGeocode } from './ajaxCalls.js';

/* ***** Getting User Location ***** */

// If Success
export let onLocationFound = e => {
    const lat = e.latlng.lat, lng = e.latlng.lng;

    // let countryCode = 'GB';

    // Currently disabling this to prevent api limit being reached - 

    // reverseGeocode(lat, lng).done(function (result) {
    //     countryISO = result[0]['CountryId'];
    //     console.log(result); // Delete It
    // }).done(function () {
    // })

    // getCountryBounds(countryCode).then(countryBounds => {
    //     L.geoJSON(countryBounds, { style: boundStyle });
    // });


}

// If Failure
export let onLocationError = e => {

}
