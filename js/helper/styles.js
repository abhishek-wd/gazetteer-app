// Style for Country Boundry
export let boundStyle = () => {
    return {
        color: "#cc7a82",
        weight: 3,
        opacity: 1,
        dashArray: '3',
        fillColor: "#bf83be",
        fillOpacity: 0.7
    }
}

// Error Card for Nav Pills
export let errorCard = (err, pillName) => {
    const body = $("<p>").addClass("card-text").text(`Unable to fetch "${pillName}". Something went wrong!`);
    const bodyDiv = $("<div>").addClass("card-body").append(body);
    const headerDiv = $("<div>").addClass("card-header").text(err);
    const outerDiv = $("<div>").addClass("card text-white bg-danger mb-3").append(headerDiv, bodyDiv);
    return $("<div>").addClass("col-12").append(outerDiv);
}

