<?php

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude='.$_REQUEST['lat'].'&longitude='.$_REQUEST['lng'].'&range=0',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => [
        'x-rapidapi-host: geocodeapi.p.rapidapi.com',
        'x-rapidapi-key: e591ba2632msh03f23a2fd6585c3p1b9f19jsne44a3585e91b',
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo 'cURL Error #:'.$err;
} else {
    echo $response;
}