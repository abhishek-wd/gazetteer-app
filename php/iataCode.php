<?php

$data = file_get_contents('../resources/iata.json');

$decode = json_decode($data, true);

$airport = [];

// foreach ($decode as $value) {
//     if (null != $value['iata_code'] && 'large_airport' == $value['type'] && $value['iso_country'] == $_REQUEST['countryCode']) {
//         array_push($airport, $value);
//     }
// }

foreach ($decode as $value) {
    if ($value['iso_country'] == $_REQUEST['countryCode'] && null != $value['municipality']) {
        array_push($airport, $value);
    }
}

$result['data'] = $airport;
$result['status']['code'] = '200';
$result['status']['name'] = 'ok';
$result['status']['description'] = 'Received from Iata Codes file';

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($result);
