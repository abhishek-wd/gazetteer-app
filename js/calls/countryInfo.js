export let getCountryInfo = (countryCode) => {
    return $.ajax({
        type: "POST",
        url: "php/countryInfo.php",
        dataType: 'json',
        data: {
            countryCode
        }, success: (result) => {
            if (result.status.name == "ok") {
                const country = result.data;
                const countryName = country.name;
                const nativeName = country.nativeName;
                const language = country.languages[0];
                const currency = country.currencies[0];

                $('#flag').attr({
                    src: `https://www.countryflags.io/${country.alpha2Code}/shiny/32.png`,
                    alt: countryName
                });

                if (countryName.includes(nativeName)) {
                    $(".modal-title").text(nativeName);
                } else if (countryName != nativeName) {
                    $(".modal-title").text(`${countryName} ( ${nativeName} )`);
                } else {
                    $(".modal-title").text(countryName);
                }

                if (language.name != language.nativeName) {
                    $('#language').text(`${language.name} ( ${language.nativeName} )`);
                } else {
                    $('#language').text(language.name);
                }

                if (currency.symbol) {
                    $('#currency').text(`${currency.code} ( ${currency.symbol} ) - ${currency.name}`);
                } else {
                    $('#currency').text(`${currency.code} - ${currency.name}`);
                }

                if (country.nativeName == 'United Kingdom') {
                    $('#time-zone').text(`${country.timezones[5]}+0`);
                } else {
                    $('#time-zone').text(country.timezones[0]);
                }

                $('#capital').text(country.capital);
                $('#region').text(`${country.region} - ${country.subregion}`);
                $('#population').text((country.population).toLocaleString());
                $('#demonym').text(country.demonym);
                $('#intl-code').text(`+${country.callingCodes[0]}`);
                $('#area').html(`${(country.area).toLocaleString()} km<sup>2</sup>`);
                $('#co-ord').html(`Latitude: ${(country.latlng[0]).toFixed(2)}, Longitude: ${(country.latlng[1]).toFixed(2)}`);
            }
        }, error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(`Bad Request: ${jqXHR.responseText}`);
            } else {
                console.error(`CountryInfo Not Found: ${textStatus} - ${errorThrown}`);
            }
        }
    }).then(result => result.data);
}
