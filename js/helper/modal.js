/* ***** Reset Functions ***** */

// Reset Modal
let resetModal = () => {
    $('.modal-header').removeClass().addClass('modal-header');
    $('#modal-flag').attr({ src: '', alt: '' });
    $('.modal-title').text('');
    $('#data-body').html('').removeClass();
    $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');
}

// On Location Found
export let getFoundModal = (lat, lng) => {
    $('.modal-header').addClass('bg-success');
    $('.modal-title').text('Location Detected');
    $('#data-body').html(`Your Current Location: <br> Latitude: ${lat} <br> 
        Longitude:${lng}`).addClass('text-success');
    $('.modal-footer button').addClass('btn-outline-success');
    $('#my-modal').modal('show');

    // Closing the modal in 2 second, if not closed
    setTimeout(() => $('#my-modal').modal('hide'), 2000);
    $('#my-modal').on('hide.bs.modal', resetModal);
}

// On Location Error
export let getErrorModal = e => {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`);
    $('#data-body').html(`${e.message} <br><br> <strong> Plese 
        Select a Country to Continue!</strong>`).addClass('text-warning');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#my-modal').modal('show');

    // Closing the modal in 2 second, if not closed
    setTimeout(() => $('#my-modal').modal('hide'), 2000);
    $('#my-modal').on('hide.bs.modal', resetModal);
}

// To Display Information
export let getInfoModal = result => {
    const countryCode = result.data.alpha2Code;
    const countryName = result.data.name;

    $('#flag').attr({
        src: `https://www.countryflags.io/${countryCode}/shiny/32.png`,
        alt: countryName
    });
    $(".modal-title").text(countryName).addClass('text-secondary font-weight-bolder mt-1');

    // $('#country-info').show(); // Check if required or not
    $('#my-modal').modal('show');

    $('#my-modal').on('hide.bs.modal', () => {
        $('.modal-header').removeClass().addClass('modal-header');
        $('#flag').attr({ src: '', alt: '' });
        $('.modal-title').text('').removeClass();
        $('#data-body').html('').removeClass();
        $('#country-info').hide();
        $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');
    });
}
