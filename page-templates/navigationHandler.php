<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 15/07/15
 * Time: 19:25
 */


for($i = 1; $i<=4; $i++) {
    $mappping = array(
        'naslov',
        'opis',
        'ikona',
    );

    $data = array();
    foreach ($mappping as $map) {
        $data[$map] = get_field($i."_".$map);
    }
    $data['ikona'] = get_image_from_custom_field($data['ikona'], 'gallery_thumb');
    $data['id'] = $i;

    get_partial('_page_navigation', array('data' => $data));

}

