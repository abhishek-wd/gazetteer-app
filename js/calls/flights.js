import { errorCard } from "../helper/styles.js";
import { result } from './temp.js';

export let getFlightDetails = (countryCode) => {
    // return $.ajax({
    //     url: 'php/flights.php',
    //     type: 'GET',
    //     dataType: 'json',
    //     success: result => {
    //         console.log(result);
    //         if (result.status.name == "ok" && !(result.data.errors)) {

    const flight = result.data[0];
    const origin = flight.origin.iataCode;
    const destination = flight.destination.iataCode;

    const img = "<img src='images/flights/flight.svg' class='img-fluid' height='auto' width='24px'/>";
    let row = $("<div>").addClass("row");

    const getCard = (priceBand, price) => {
        let title = $("<h5>").addClass("card-title").text(`£${price}`);
        let bodyDiv = $("<div>").addClass("card-body text-center px-md-3").append(title);

        let headerDiv = $("<div>").addClass("card-header text-center px-md-3").html(`${priceBand}`);

        let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, bodyDiv);
        let col = $("<div>").addClass("col-md-4 px-md-2 col-12").append(outerDiv);

        $(row).append(col);
    }

    let priceCard = () => flight.priceMetrics.forEach((el) => {
        let priceBand = el.quartileRanking;
        let price = el.amount;
        if (priceBand == 'MINIMUM') {
            getCard('Minimum', price);
        } else if (priceBand == 'MEDIUM') {
            getCard('Average', price);
        } else if (priceBand == 'MAXIMUM') {
            getCard('Maximum', price);
        }
    });

    let footNote = $("<small>").html(`&copy;Amadeus Flight price Analysis`);
    let footer = $("<div>").addClass("class-footer text-right mr-3").append(footNote);

    $(row).append(priceCard());
    let contentDiv = $("<div>").addClass("card-body").append(row);

    let flightDate = $("<small>").addClass("pb-2").html(` [${flight.departureDate}]`);
    let headerDiv = $("<div>").addClass("card-header").html(`${origin} ${img} ${destination}`).append(flightDate);

    let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, contentDiv, footer);
    let col = $("<div>").addClass("col-12").append(outerDiv);

    $("#flights").append(col);

    //         } else {
    //             $("#flights").append(errorCard('Unsupported Route!', 'Flight Details'));
    //         }
    //     },
    //     error: (jqXHR, textStatus, errorThrown) => {
    //         if (jqXHR.status && jqXHR.status == 400) {
    //             console.debug(`Bad Request: ${jqXHR.responseText}`);
    //         } else {
    //             console.error(`Flight Details Not Found: ${textStatus} - ${errorThrown}`);
    // $("#flights").append(errorCard('Unsupported Route!', 'Flight Details'));
    //         }
    //     }
    // });
}