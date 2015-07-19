<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 19/07/15
 * Time: 16:50
 */
$mapping = array(
    'naslov',
    'ikona'
);



for($i = 1; $i <= 4; $i++){
    $data = array();
    $data['id'] = $i;
    foreach ($mapping as $map) {
        $data[$map] = get_field($i."_".$map);
        if(strpos($map, 'ikona') !== false){
            $data[$map] = get_image_from_custom_field($data[$map], 'gallery_thumb');
        }
    }

    if( !empty($data['naslov']) && !empty($data['ikona']) ){
        get_partial('_subMeni', array('data' => $data));
    }
}