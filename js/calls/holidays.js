import { errorCard } from "../helper/styles.js";

export let getHolidays = (countryCode) => {

    return $.ajax({
        type: "POST",
        url: "php/holidays.php",
        dataType: 'json',
        data: {
            countryCode
        },
        success: (result) => {
            if (result.status.name == "ok" && result.data) {
                const holiday = result.data.holidays;

                let getCard = (date, name, desc, remainingDay) => {
                    const title = $("<h5>").addClass("card-title").text(name);
                    const body = $("<p>").addClass("card-text").text(desc);
                    const bodyDiv = $("<div>").addClass("card-body").append(title, body);
                    const timeLeft = $("<small>").html(` [ ${remainingDay} days left. ]`);
                    const headerDiv = $("<div>").addClass("card-header").html(`${date}`).append(timeLeft);
                    const outerDiv = $("<div>").addClass("card text-white bg-info mb-3").append(headerDiv, bodyDiv);
                    const col = $("<div>").addClass("col-12").append(outerDiv);
                    $("#holidays").append(col);
                }

                holiday.forEach(el => {
                    if (el.type[0] == 'National holiday') {
                        const festivalDate = Date.parse(el.date.iso);
                        const today = Date.now();
                        const remainingDay = Math.floor((((((festivalDate - today) / 1000) / 60) / 60) / 24));
                        if (remainingDay > 0) {
                            getCard(el.date.iso, el.name, el.description, remainingDay);
                        }
                    }
                });
            } else {
                $("#holidays").append(errorCard('Error!', 'Holidays'));
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(`Bad Request: ${jqXHR.responseText}`);
            } else {
                console.error(`Holidays Not Found: ${textStatus} - ${errorThrown}`);
            }
        }
    });
}
