import { errorCard } from "../helper/styles.js";

export let getFlightDetails = (iataCode) => {

    let setDate = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        let month = '' + (result.getMonth() + 1), day = '' + result.getDate(), year = result.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    const date = new Date();
    let departureDate = setDate(date, 15);
    let arrivalDate = setDate(date, 30);

    if (!iataCode) {
        $("#flights").append(errorCard('Unsupported Route! Covid Restriction', 'Flight Details'));
    } else {
        return $.ajax({
            url: 'php/flights.php',
            type: 'POST',
            dataType: 'json',
            data: {
                destinationIata: iataCode,
                departureDate,
                arrivalDate
            },
            success: result => {
                // console.log(result);
                const flight = result.data;
                const quote = flight.Quotes[0];

                if (result.status.name == "ok" && flight.Carriers.length != 0) {

                    const img = "<img src='images/flights/flight.svg' class='img-fluid' height='auto' width='24px'/>";
                    let row = $("<div>").addClass("row");

                    let priceCard = () => {
                        let headerDiv = $("<div>").addClass("card-header text-center px-md-3").text("Cheapest");

                        let title = $("<h5>").addClass("card-title")
                            .html(`${flight.Currencies[0].Symbol}${flight.Quotes[0].MinPrice}`);
                        let bodyDiv = $("<div>").addClass("card-body text-center px-md-3").append(title);

                        let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, bodyDiv);
                        let col = $("<div>").addClass("col-md-4 px-md-2 col-12").append(outerDiv);
                        $(row).append(col);
                    }

                    let flightDetails = () => {
                        let stopOver = quote.Direct ? "Direct" : "1 Stop";
                        let headerDiv = $("<div>").addClass("card-header text-center px-md-3")
                            .html(`${flight.Carriers[0].Name} [${stopOver}]`);

                        let outboundDate = $("<p>").addClass("card-text mb-2").html(`Departure: ${departureDate}`);
                        let inboundDate = $("<p>").addClass("card-text mb-1").html(`Return: ${arrivalDate}`);
                        let bodyDiv = $("<div>").addClass("card-body px-md-3 py-md-2").append(outboundDate, inboundDate);

                        let outerDiv = $("<div>").addClass("card text-white bg-info mb-1").append(headerDiv, bodyDiv);
                        let col = $("<div>").addClass("col-md-8 px-md-2 col-12").append(outerDiv);
                        $(row).append(col);
                    }

                    let footNote = $("<small>").text("Source: Cheapest Flight on Skyscanner");
                    let footer = $("<div>").addClass("class-footer text-right mr-3").append(footNote);

                    $(row).append(flightDetails()).append(priceCard());
                    let contentDiv = $("<div>").addClass("card-body").append(row);

                    let headerDiv = $("<div>").addClass("card-header")
                        .html(`${flight.Places[1].Name} ${img} ${flight.Places[0].Name}`);

                    let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, contentDiv, footer);
                    let col = $("<div>").addClass("col-12").append(outerDiv);

                    $("#flights").append(col);

                } else {
                    $("#flights").append(errorCard('Unsupported Route! Covid Restriction', 'Flight Details'));
                }
            },
            error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status && jqXHR.status == 400) {
                    console.debug(`Bad Request: ${jqXHR.responseText}`);
                } else {
                    console.error(`Flight Details Not Found: ${textStatus} - ${errorThrown}`);
                    $("#flights").append(errorCard('Unsupported Route!', 'Flight Details'));
                }
            }
        });
    }
}
