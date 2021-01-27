export let sanitizeName = (countryName) => {

    // Changing keyword for Countries not recognized by News API
    if (countryName.includes('United Kingdom')) {
        countryName = 'England';
    } else if (countryName.includes('United Arab')) {
        countryName = 'Dubai';
    } else if (countryName.includes('United States')) {
        countryName = 'America';
    } else if (countryName.includes('Bosnia')) {
        countryName = 'Bosnia';
    } else if (countryName.includes('Bolivia')) {
        countryName = 'Bolivia';
    } else if (countryName.includes('Brunei')) {
        countryName = 'Brunei';
    } else if (countryName.includes('Ivoire')) {
        countryName = 'Ivory Costa';
    } else if (countryName.includes('Congo')) {
        countryName = 'Congo';
    } else if (countryName.includes('Korea (Democratic')) {
        countryName = 'North Korea';
    } else if (countryName.includes('Korea (Republic')) {
        countryName = 'Seoul';
    }
    return countryName;
}