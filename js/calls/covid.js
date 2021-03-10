import { covidName } from '../helper/sanitize.js'

let result;

export let getCovidData = () => {
    $.ajax({
        type: "GET",
        url: "php/covid.php",
        async: false, // Not ideal - but to limit API calls on Free Plan
        dataType: 'json',
        success: (data) => {
            if (data.success) {
                result = data.result;
                // console.log(result); List will be stored here.
            }
        }
    });
}

export let fillCovidData = (countryName) => {
    $('#country-name').text(countryName).addClass('text-secondary font-weight-bolder ml-3');

    let countryData = result.filter(country => country.country == covidName(countryName));

    $('#new-cases').text(countryData[0].newCases);
    $('#new-deaths').text(countryData[0].newDeaths);
    $('#active-cases').text(countryData[0].activeCases);
    $('#total-cases').text(countryData[0].totalCases);
    $('#total-deaths').text(countryData[0].totalDeaths);
    $('#total-recovered').text(countryData[0].totalRecovered);
}