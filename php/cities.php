<?php

$url = 'https://geohub3.p.rapidapi.com/cities/country/'.$_REQUEST['countryCode'].'?pageSize=500&sort=desc&minPopulation=10000&orderBy=population';

$curl = curl_init();

$executionStartTime = microtime(true);

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => [
        'x-rapidapi-host: geohub3.p.rapidapi.com',
        'x-rapidapi-key: e591ba2632msh03f23a2fd6585c3p1b9f19jsne44a3585e91b',
    ],
]);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($error) {
    echo 'cURL Error #:'.$error;
} else {
    $decode = json_decode($response, true);

    $city = $decode['data']['cities'];
    $length = count($city);

    $main_cities = []; // Top 10 Cities of each Country
    $big_cities = []; // The top 33% of remaining cities
    $small_cities = []; // The middle 33%
    $town = []; // The remaining ones.

    function assignCity($city)
    {
        $cityList['countryCode'] = $city['countryCode'];
        $cityList['id'] = $city['id'];
        $cityList['latitude'] = $city['latitude'];
        $cityList['longitude'] = $city['longitude'];
        $cityList['name'] = $city['name'];
        $cityList['population'] = $city['population'];

        return $cityList;
    }

    for ($x = 0; $x < $length; ++$x) {
        // Checking if country have less than 10 cities.
        if ($x < 10) {
            $main_cities[$x] = assignCity($city[$x]);
        } else {
            break;
        }
    }

    // Dividing the rest of the cities in 3 catagories
    $categoryCount = (int) ($length - 10) / 3;
    $bigStart = 10;

    if ($categoryCount >= 1) {
        $bigEnd = $bigStart + $categoryCount;
        $smallStart = $bigEnd;
        $smallEnd = $smallStart + $categoryCount;
        $townStart = $smallEnd;

        // Allocating Big Cities
        for ($x = $bigStart; $x < $bigEnd; ++$x) {
            $big_cities[$x] = assignCity($city[$x]);
        }

        // Allocating Small Cities
        for ($x = $smallStart; $x < $smallEnd; ++$x) {
            $small_cities[$x] = assignCity($city[$x]);
        }

        // Allocating Towns
        for ($x = $townStart; $x < $length; ++$x) {
            $town[$x] = assignCity($city[$x]);
        }
    } else {
        $bigEnd = $length;
    }

    $result['data']['main'] = $main_cities;
    $result['data']['big'] = $big_cities;
    $result['data']['small'] = $small_cities;
    $result['data']['town'] = $town;

    $result['status']['code'] = '200';
    $result['status']['name'] = 'ok';
    $result['status']['description'] = 'Received from Geo Hub';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
