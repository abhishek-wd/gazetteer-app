export let sanitizeName = (countryName) => {

    // Changing keyword for Countries not recognized by News API
    if (countryName.includes('United Kingdom')) {
        return 'England';
    } else if (countryName.includes('Bolivia')) {
        return 'Bolivia';
    } else if (countryName.includes('Bosnia')) {
        return 'Bosnia';
    } else if (countryName.includes('Brunei')) {
        return 'Brunei';
    } else if (countryName.includes('Burkina')) {
        return 'Burkina';
    } else if (countryName.includes('Central African')) {
        return 'Bangui';
    } else if (countryName.includes('Costa Rica')) {
        return 'Rica';
    } else if (countryName.includes('Czech')) {
        return 'Prague';
    } else if (countryName.includes('Ivoire')) {
        return 'Yamoussoukro';
    } else if (countryName.includes('Congo')) {
        return 'Congo';
    } else if (countryName.includes('Korea (Democratic')) {
        return 'Pyongyang';
    } else if (countryName.includes('Dominican')) {
        return 'Dominican';
    } else if (countryName.includes('Salvador')) {
        return 'Salvador';
    } else if (countryName.includes('Equatorial')) {
        return 'Malabo';
    } else if (countryName.includes('Falkland')) {
        return 'Falkland';
    } else if (countryName.includes('Iran')) {
        return 'Iran';
    } else if (countryName.includes('Korea (Republic')) {
        return 'Seoul';
    } else if (countryName.includes('Lao')) {
        return 'Laos';
    } else if (countryName.includes('Macedonia')) {
        return 'Macedonia';
    } else if (countryName.includes('Moldova')) {
        return 'Moldova';
    } else if (countryName.includes('Caledonia')) {
        return 'Caledonia';
    } else if (countryName.includes('Zealand')) {
        return 'Zealand';
    } else if (countryName.includes('Niger')) {
        return 'Niamey';
    } else if (countryName.includes('Palestine')) {
        return 'Palestine';
    } else if (countryName.includes('Papua')) {
        return 'Papua';
    } else if (countryName.includes('Puerto')) {
        return 'Puerto';
    } else if (countryName.includes('South Sudan')) {
        return 'Juba';
    } else if (countryName.includes('Saudi')) {
        return 'Riyadh';
    } else if (countryName.includes('Solomon')) {
        return 'Honiara';
    } else if (countryName.includes('Sierra')) {
        return 'Freetown';
    } else if (countryName.includes('South Africa')) {
        return 'Pretoria';
    } else if (countryName.includes('Lanka')) {
        return 'Colombo';
    } else if (countryName.includes('Syrian')) {
        return 'Damascus';
    } else if (countryName.includes('Trinidad')) {
        return 'Trinidad';
    } else if (countryName.includes('Tanza')) {
        return 'Dodoma';
    } else if (countryName.includes('United Arab')) {
        return 'Dubai';
    } else if (countryName.includes('United States')) {
        return 'America';
    } else if (countryName.includes('Venez')) {
        return 'Caracas';
    } else if (countryName.includes('Viet')) {
        return 'Hanoi';
    } else if (countryName.includes('Sahara')) {
        return 'Aaiun';
    }
    return countryName;
}