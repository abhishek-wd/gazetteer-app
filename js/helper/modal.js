/* ***** Reset Functions ***** */

// On Location Found
export let getFoundModal = (lat, lng) => {
    $('.modal-header').addClass('bg-success');
    $('.modal-title').text('Location Detected');
    $('#data-body').html(`Your Current Location: <br> Latitude: ${lat} <br> 
        Longitude:${lng}`).addClass('text-success');
    $('.modal-footer button').addClass('btn-outline-success');
    $('#my-modal').modal('show');

    setTimeout(() => $('#my-modal').modal('hide'), 2000);
    $('#my-modal').on('hide.bs.modal', resetModal);
}

// On Location Error
export let getErrorModal = e => {
    $('.modal-header').addClass('bg-warning');
    $('.modal-title').text(`Error Code [${e.code}]`).addClass('font-weight-bold');
    $('#data-body').html(`${e.message} <br><br> Please 
        Select a Country to Continue!`).addClass('text-danger font-weight-bold');
    $('.modal-footer button').addClass('btn-outline-warning');
    $('#my-modal').modal('show');

    setTimeout(() => $('#my-modal').modal('hide'), 5000);
    $('#my-modal').on('hide.bs.modal', resetModal);
}

// To Display Information
export let getInfoModal = result => {
    const country = result.data;
    // const countryCode = result.data.alpha2Code;

    // double check how code can be minimized, use country where possible

    const countryName = country.name;
    const nativeName = country.nativeName;
    const language = country.languages[0];
    const currency = country.currencies[0];

    $('#data-body').hide();
    $('#flag').attr({
        src: `https://www.countryflags.io/${country.alpha2Code}/shiny/32.png`,
        alt: countryName
    });

    if (countryName != nativeName) {
        $(".modal-title").text(`${countryName} ( ${nativeName} )`)
    } else {
        $(".modal-title").text(countryName).addClass('text-secondary font-weight-bolder mt-1');
    }

    $('#capital').text(result.data.capital);
    $('#region').text(`${country.region} - ${country.subregion}`);
    $('#population').text((result.data.population).toLocaleString());

    if (language.name != language.nativeName) {
        $('#language').text(`${language.name} ( ${language.nativeName} )`);
    } else {
        $('#language').text(language.name);
    }

    $('#currency').text(`${currency.code} ( ${currency.symbol} ) - ${currency.name}`);
    $('#area').html(`${(result.data.area).toLocaleString()} km<sup>2</sup>`);//} `);
    $('#ccode').text(`+${result.data.callingCodes[0]}`);
    $('#demonym').text(result.data.demonym);
    $('#country-info').show();
    $('#my-modal').modal('show');

    $('#my-modal').on('hide.bs.modal', resetModal);
}

// Reset Modal
let resetModal = () => {
    $('.modal-header').removeClass().addClass('modal-header');
    $('#flag').attr({ src: '', alt: '' });
    $('.modal-title').text('').removeClass().addClass('modal-title');
    $('#data-body').html('').removeClass();
    $('#country-info').hide();
    $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');
}