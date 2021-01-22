<?php

$url = 'https://api.opencagedata.com/geocode/v1/json?q='.$_REQUEST['lat'].'+'.$_REQUEST['lng'].'&key=eb5c65dbcf89459d9d28504c2509a70b';

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

    $result['data'] = $decode['results'];
    $result['status'] = $decode['status'];
    $result['status']['description'] = 'Received from OpenCage';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
