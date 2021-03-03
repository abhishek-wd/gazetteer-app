import { getInfoModal } from "../helper/modal.js";

export let infoButton = L.easyButton({
    position: 'bottomleft',
    states: [{
        stateName: 'show-info',
        icon: 'fa-info-circle fa-2x',
        title: 'Show Country Info',
        onClick: () => {
            getInfoModal();
        }
    }]
});

export let covidButton = L.easyButton({
    position: 'bottomleft',
    states: [{
        icon: 'fa-virus fa-2x',
        title: 'Show Covid-19 Info',
        onClick: (control) => {
            // control.state('hide-info');
        }
    }]
});

export let populationButton = L.easyButton({
    position: 'bottomleft',
    states: [{
        icon: 'fa-user-circle fa-2x',
        title: 'Show Population Info',
        onClick: (control) => {
            // control.state('hide-info');
        }
    }]
});

export let starButton = L.easyButton({
    position: 'bottomleft',
    states: [{
        icon: 'fa-star',
        onClick: function () {
            alert("You Just Clicked a Star");
        },
    }]
});
