<?php

$executionStartTime = microtime(true);

$curl = curl_init();
$tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
$credentials = 'grant_type=client_credentials&client_id=7z4l40Z49HcXAnL5nEPuKqzKOEjGb9n9&client_secret=drJJEs1NT7P6EYnA';
$grantHeader = ['Content-Type: application/x-www-form-urlencoded'];

curl_setopt_array($curl, [
    CURLOPT_URL => $tokenUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $credentials,
    CURLOPT_HTTPHEADER => $grantHeader,
]);

$token = curl_exec($curl);
$data = json_decode($token, true);

$queryUrl = 'https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics?originIataCode=LHR&destinationIataCode=MAD&departureDate=2021-03-21&currencyCode=GBP&oneWay=false';
$requestHeader = ['Authorization: Bearer '.$data['access_token']];

curl_setopt_array($curl, [
    CURLOPT_URL => $queryUrl,
    CURLOPT_RETURNTRANSFER => true,
    // CURLOPT_POST => false,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => $requestHeader,
]);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($error) {
    echo 'cURL Error #:'.$error;
} else {
    $decode = json_decode($response, true);
    $result['data'] = $decode['data'];
    $result['status']['code'] = '200';
    $result['status']['name'] = 'ok';
    $result['status']['description'] = 'Received from Amadeus';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
