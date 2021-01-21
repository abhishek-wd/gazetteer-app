import { getCountryBounds } from './ajaxCalls.js';
import { boundStyle } from './helper/styles.js';
import { resetModal } from './helper/reset.js';
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

    $('.modal-header').addClass('bg-success');
    $('.modal-title').text('Location Detected');
    $('#data-body').html(`Your Current Location: <br> Latitude: ${lat} <br> 
        Longitude:${lng}`).addClass('text-success');
    $('.modal-footer button').addClass('btn-outline-success');
    $('#myModal').modal('show');

    // Closing the modal in 2 second, if not closed
    // setTimeout(function () {
    //     $('#myModal').modal('hide');
    // }, 2000);

    // Removing the temporarily added class
    // $('#myModal').on('hide.bs.modal', () => resetModal());
    resetModal();
}

// If Failure
export let onLocationError = e => {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`);
    $('#data-body').html(`${e.message} <br><br> <strong> Plese 
        Select a Country to Continue!</strong>`).addClass('text-warning');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#myModal').modal('show');

    // Closing the modal in 2 second, if not closed
    setTimeout(() => $('#myModal').modal('hide'), 2000);

    resetModal();
}
