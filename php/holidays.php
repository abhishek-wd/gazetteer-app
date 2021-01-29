<?php

$url = 'https://calendarific.com/api/v2/holidays?&api_key=3f9396e64518c2af8da6d5c1cdd7e3c87516f16cf54b43f1d7526cb802dd6a63&country='.$_REQUEST['countryCode'].'&year=2021';

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

    $result['data'] = $decode['response'];
    $result['status']['code'] = '200';
    $result['status']['name'] = 'ok';
    $result['status']['description'] = 'Received from Calendarific';
    $result['status']['returnedIn'] = round((microtime(true) - $executionStartTime) * 1000).'ms';

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result);
}
