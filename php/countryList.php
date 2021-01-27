<?php

$data = file_get_contents('../resources/countryBorders.geo.json');

$decode = json_decode($data, true);

$result['data'] = $decode;
$result['status']['code'] = '200';
$result['status']['name'] = 'ok';
$result['status']['description'] = 'Received from geoJSON file';

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($result);
