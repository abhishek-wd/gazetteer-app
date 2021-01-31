export let getIataCode = (capital) => {
    console.log("capital Received:" + capital);

    return $.ajax({
        type: "GET",
        url: "php/iata.php",
        dataType: 'json',
        // data: {
        //     coordinates
        // },
        success: (result) => {
            // if (result.status.name == "ok" && !result.data.isError) {
            console.log(result);
            // }
        },
        error: (jqXHR, textStatus, errorThrown) => console.error(`IATA Code Not Found: ${textStatus} - ${errorThrown}`)
    });
}