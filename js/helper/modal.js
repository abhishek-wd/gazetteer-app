// On Location Found
// export let getFoundModal = (lat, lng) => {
//     $('.modal-header').addClass('bg-success');
//     $('.modal-title').text('Location Detected');
//     $('#data-body').html(`Your Current Location: <br> Latitude: ${lat} <br> 
//         Longitude:${lng}`).addClass('text-success');
//     $('.modal-footer button').addClass('btn-outline-success');
//     $('#my-modal').modal('show');

//     // setTimeout(() => $('#my-modal').modal('hide'), 2000);
//     // $('#my-modal').on('hide.bs.modal', resetModal);
// }

// On Location Error
export let getErrorModal = e => {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`).addClass('font-weight-bold');
    $('#data-body').html(`${e.message} <br><br> Please 
        Select a Country to Continue!`).addClass('text-danger font-weight-bold');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#my-modal').modal('show');

    setTimeout(() => $('#my-modal').modal('hide'), 5000);
    // $('#my-modal').on('hide.bs.modal', resetModal);
}

// To Display Information
export let getInfoModal = () => {
    // $('#my-modal').on('show.bs.modal', resetModal);
    $('#data-body').hide();
    $(".modal-title").addClass('text-secondary font-weight-bolder mt-1');
    $('#country-info').show();
    $('#info-tab').tab('show');
    $('#rate-pill').tab('show');

    $('#my-modal').modal('show');

    // $('#my-modal').on('hide.bs.modal', resetModal);
}

// Reset Modal
export let resetModal = () => {
    // $('.modal-header').removeClass().addClass('modal-header');
    $('#flag').attr({ src: '', alt: '' });
    $('.modal-title').text('').removeClass().addClass('modal-title');
    $('#data-body').html('').removeClass();
    $('.nav-link').removeClass('disabled');

    $('#exchange-rate').empty();
    $('#flights').empty();
    $('#holidays').empty();
    $("#news").empty();

    $('#country-info').hide();
    $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');

    // alert('modal reset completed')// For Testing Only 
}