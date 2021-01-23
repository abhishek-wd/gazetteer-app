<?php

$url = 'https://restcountries.eu/rest/v2/alpha/'.$_REQUEST['countryCode'];

$executionStartTime = microtime(true);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true, // To store the returned value in a variable
    CURLOPT_SSL_VERIFYPEER => false, // To ignore the website SSL certificate
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
    $result['status']['description'] = 'Received from Rest Countries';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
