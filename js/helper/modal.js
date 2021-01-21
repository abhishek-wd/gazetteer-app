/* ***** Reset Functions ***** */

// Reset Modal
let resetModal = () => {
    $('#myModal').on('hide.bs.modal', () => {
        $('.modal-header').removeClass().addClass('modal-header');
        $('.modal-title').text('');
        $('#data-body').html('').removeClass();
        $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');
    });
}

// Location Found
export let getFoundModal = (lat, lng) => {
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

    resetModal();
}

// Location Error
export let getErrorModal = (e) => {
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

