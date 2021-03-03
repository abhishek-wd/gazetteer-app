export let getIataCode = (countryCode, capital) => {

    return $.ajax({
        type: "GET",
        url: "php/iataCode.php",
        dataType: 'json',
        data: {
            countryCode
        },
        error: (jqXHR, textStatus, errorThrown) => console.error(`IATA Code Not Found: ${textStatus} - ${errorThrown}`)
    }).then(result => {
        let airport, validAirport, mainAirport;
        const airports = result.data;

        if (result.status.name == "ok" && airports.length != 0) {
            // Cities Having only 1 airport
            if (airports.length == 1) {
                return airports[0].iata_code;;
            } else {
                // If name contains accentuated characters
                const nCapital = capital.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                airport = airports.filter(el => nCapital.includes(el.municipality));

                // If name doesn't match like in case of Brasil
                if (airport.length == 0) {
                    airport = airports.filter(el => nCapital.substring(1, 4).includes(el.municipality.substring(1, 4)));
                }

                // Checking for international airport
                mainAirport = airport.filter(el => el.name.includes('International'));

                if (mainAirport.length == 0) {
                    mainAirport = airport;
                }

                if (mainAirport[0].iata_code) {
                    return mainAirport[0].iata_code;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    });
}
