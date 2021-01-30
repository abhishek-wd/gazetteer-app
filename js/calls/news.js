import { errorCard } from "../helper/styles.js";

export let getNews = (keyword) => {

    return $.ajax({
        type: "POST",
        url: "php/news.php",
        dataType: 'json',
        data: {
            keyword
        },
        success: (result) => {
            if (result.status.name == "ok" && result.data) {
                result.data.value.forEach(element => {
                    const title = $("<h4>").html(element.title).addClass('alert-heading');
                    const desc = $("<p>").html(element.description);
                    const link = $("<a>", {
                        href: element.url,
                        target: '_blank',
                        text: "Read Full News..."
                    });
                    const div = $("<div>").addClass("alert alert-success").append(title, '<hr>', desc, link);
                    $("#news").append(div);
                });
            } else {
                // const title = $("<h4>").text("Unable to Fetch News. Please Try Again!").addClass('alert-heading');
                // const div = $("<div>").addClass("alert alert-danger").append(title);
                // $("#news").append(div);
                $("#news").append(errorCard('Error!', 'News'));
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status && jqXHR.status == 400) {
                console.debug(`Bad Request: ${jqXHR.responseText}`);
            } else {
                console.error(`News Not Found: ${textStatus} - ${errorThrown}`);
                $("#news").append(errorCard('Error!', 'News'));
            }
        }
    });
}
