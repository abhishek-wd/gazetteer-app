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
            }
        }
    });
}

export let fillCovidData = () => {
    console.log(result);
}