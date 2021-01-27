<?php

$url = 'https://openexchangerates.org/api/latest.json?app_id=9a230d5fc1924535acbb6abef36112f1';

$executionStartTime = microtime(true);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
]);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($error) {
    echo 'cURL Error #:'.$error;
} else {
    $decode = json_decode($response, true);

    $result['data'] = $decode['rates'];
    $result['status']['code'] = '200';
    $result['status']['name'] = 'ok';
    $result['status']['description'] = 'Received from Open Exchange Rates';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
