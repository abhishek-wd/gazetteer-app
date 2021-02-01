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
            url: 'php/skyScanner.php',
            type: 'POST',
            dataType: 'json',
            data: {
                destinationIata: iataCode,
                departureDate,
                arrivalDate
            },
            success: result => {
                console.log(result);
                const flight = result.data;
                const quote = flight.Quotes[0];

                if (result.status.name == "ok" && flight.Carriers.length != 0) {


                    // const flight = result.data[0];
                    // const origin = flight.origin.iataCode;
                    // const destination = flight.destination.iataCode;

                    const img = "<img src='images/flights/flight.svg' class='img-fluid' height='auto' width='24px'/>";
                    let row = $("<div>").addClass("row");

                    // const getCard = (priceBand, price) => {
                    //     let title = $("<h5>").addClass("card-title").text(`£${price}`);
                    //     let bodyDiv = $("<div>").addClass("card-body text-center px-md-3").append(title);

                    //     let headerDiv = $("<div>").addClass("card-header text-center px-md-3").html(`${priceBand}`);

                    //     let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, bodyDiv);
                    //     let col = $("<div>").addClass("col-md-4 px-md-2 col-12").append(outerDiv);

                    //     $(row).append(col);
                    // }

                    // let priceCard = () => flight.priceMetrics.forEach((el) => {
                    //     let priceBand = el.quartileRanking;
                    //     let price = el.amount;
                    //     if (priceBand == 'MINIMUM') {
                    //         getCard('Minimum', price);
                    //     } else if (priceBand == 'MEDIUM') {
                    //         getCard('Average', price);
                    //     } else if (priceBand == 'MAXIMUM') {
                    //         getCard('Maximum', price);
                    //     }
                    // });
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
                        let headerDiv = $("<div>").addClass("card-header text-center px-md-3").html(`${flight.Carriers[0].Name}`);

                        let outboudDate = () => {
                            const date = quote.OutboundLeg.DepartureDate;
                            // const day = outDate.getDay();
                            console.log(typeof date);
                            console.log(date);
                            return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                        }

                        let inboudDate = () => {
                            const outDate = Date.parse(quote.OutboundLeg.DepartureDate);
                            // const day = outDate.getDay();
                            return outDate.getFullYear() + "/" + (outDate.getMonth() + 1) + "/" + outDate.getDate();
                        }


                        // let title = $("<h5>").addClass("card-title")
                        //     .html(`${flight.Currencies[0].Symbol}${flight.Quotes[0].MinPrice}`);
                        let outboundDate = $("<p>").addClass("card-text").html(`Departure Date: ${departureDate}`);
                        let inboundDate = $("<p>").addClass("card-text").html(`Return Date: ${arrivalDate}`);
                        let stopOver = $("<p>").addClass("card-text").html(`Layover: ${quote.Direct ? "Direct" : "1 Stop"}`);
                        let bodyDiv = $("<div>").addClass("card-body px-md-3").append(outboundDate, inboundDate, stopOver);

                        let outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, bodyDiv);
                        let col = $("<div>").addClass("col-md-8 px-md-2 col-12").append(outerDiv);
                        $(row).append(col);
                    }

                    let footNote = $("<small>").text("Source: Cheapest Flight on Skyscanner");
                    let footer = $("<div>").addClass("class-footer text-right mr-3").append(footNote);

                    $(row).append(flightDetails()).append(priceCard());
                    let contentDiv = $("<div>").addClass("card-body").append(row);

                    // let flightName = $("<small>").addClass("pb-2").html(` [${flight.Carriers[0].Name}]`);
                    let headerDiv = $("<div>").addClass("card-header")
                        .html(`${flight.Places[1].Name} ${img} ${flight.Places[0].Name}`);
                    // .append(flightName);

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