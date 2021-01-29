import { errorCard } from "../helper/styles.js";

export let getExchangeRate = (currencyCode) => {

    return $.ajax({
        type: "GET",
        url: "php/exchangeRate.php",
        dataType: 'json',
        success: (result) => {
            if (result.status.name == "ok" && result.data) {
                const currency = result.data;

                const dollars = (currency[currencyCode]).toFixed(2);
                const pounds = (currency[currencyCode] / currency['GBP']).toFixed(2);
                const euros = (currency[currencyCode] / currency['EUR']).toFixed(2);
                const inr = (currency[currencyCode] / currency['INR']).toFixed(2);

                let getCard = (baseCurrency, value, currencyCode) => {
                    const img = $("<img />").attr({
                        src: `images/currencies/${baseCurrency}.svg`,
                        alt: baseCurrency
                    }).addClass("card-img-top p-1");

                    const title = $("<p>").addClass("card-text").html(`${value} ${currencyCode}`);
                    const innerDiv = $("<div>").addClass("card-body px-0 text-center").append(title);

                    const outerDiv = $("<div>").addClass("card border-light").append(img, innerDiv);
                    const col = $("<div>").addClass("col").append(outerDiv);
                    $("#exchange-rate").append(col);
                }

                if (currencyCode != 'USD') {
                    getCard('USD', dollars, currencyCode);
                }
                if (currencyCode != 'GBP') {
                    getCard('GBP', pounds, currencyCode);
                }
                if (currencyCode != 'EUR') {
                    getCard('EUR', euros, currencyCode);
                }
                if (currencyCode == 'USD' || currencyCode == 'GBP' || currencyCode == 'EUR') {
                    getCard('INR', inr, currencyCode);
                }
            }
            else {
                $("#exchange-rate").append(errorCard('Error!', 'Exchange Rate'));
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(`Bad Request: ${jqXHR.responseText}`);
            } else {
                console.error(`Exchange Rate Not Found: ${textStatus} - ${errorThrown}`);
            }
        }
    });
}
