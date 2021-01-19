import { resetModal } from './reset.js';
import { reverseGeocode } from './ajaxCalls.js';

/* ***** Getting User Location ***** */

// If Success
export function onLocationFound(e) {
    const lat = e.latlng.lat, lng = e.latlng.lng;

    let countryISO;

    reverseGeocode(lat, lng).done(function (result) {
        countryISO = result[0]['CountryId'];
        console.log(result); // Delete It
    }).done(function () {
        $('.modal-header').addClass('bg-success');
        $('.modal-title').text('Location Detected');
        $('#data-body').html(`Latitude: ${e.latlng.lat} <br> Longitude:
         ${e.latlng.lng} <br> You Are In: ${countryISO}`).addClass('text-success');
        $('.modal-footer button').addClass('btn-outline-success');
        $('#myModal').modal('show');

        // Closing the modal in 2 second, if not closed
        // setTimeout(function () {
        //     $('#myModal').modal('hide');
        // }, 2000);

        // Removing the temporarily added class
        $('#myModal').on('hide.bs.modal', function () {
            resetModal();
        });
    });
}

// If Failure
export function onLocationError(e) {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`);
    $('#data-body').text(e.message).addClass('text-warning');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#myModal').modal('show');

    // Closing the modal in 2 second, if not closed
    setTimeout(function () {
        $('#myModal').modal('hide');
    }, 2000);

    // Removing the temporarily added class
    $('#myModal').on('hide.bs.modal', function () {
        resetModal();
    });
}
