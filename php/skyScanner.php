<?php

// $url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LHR-iata/'.$_REQUEST['destinationIata'].'-iata/2021-03-01';
// $url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LHR-iata/'.$_REQUEST['destinationIata'].'-iata/'.$_REQUEST['departureDate'];
$url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LHR-iata/'.$_REQUEST['destinationIata'].'-iata/'.$_REQUEST['departureDate'].'?inboundpartialdate='.$_REQUEST['arrivalDate'];
// $url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/GB/GBP/en-GB/LHR-iata/'.$_REQUEST['destinationIata'].'-iata/'.$_REQUEST['departureDate'].'?inboundpartialdate='.$_REQUEST['arrivalDate'];
$executionStartTime = microtime(true);

$curl = curl_init();

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
        'x-rapidapi-host: skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
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

    $result['data'] = $decode;
    $result['status']['code'] = '200';
    $result['status']['name'] = 'ok';
    $result['status']['description'] = 'Received from Skyscanner';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}