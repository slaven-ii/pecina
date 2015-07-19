<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 14/07/15
 * Time: 17:29
 */
$numberOfImages = 3;
$current = 1;
$template = (isset($view))? $view : '_section';
$special = (isset($special))? $special : false;
$mappping = array(
    'naslov',
    'lijeva_kolona_title',
    'lijeva_kolona_content',
    'srednja_kolona_title',
    'srednja_kolona_content',
    'desna_kolona_title',
    'desna_kolona',
    'p_lijeva_ikona',
    'p_lijeva_sadrzaj',
    'p_srednja_ikona',
    'p_srednja_sadrzaj',
    'p_desna_ikona',
    'p_desna_sadrzaj',
);

$data = array();
foreach ($mappping as $map) {
    $data[$map] = get_field($id."_".$map);
//    if(strpos($map, 'ikona') !== false){
//        $data[$map] = get_image_from_custom_field($data[$map], 'gallery_thumb');
//    }
}
$data['id'] = $id;
$data['next'] = $next;
$data['special'] = $special;
$data['images'] = array();

//hacking, not good slaven
if($id == 3){
    $fieldId = $id."_fotografija";
    $image = get_field($fieldId);
    $data['images'] = array(get_image_from_custom_field($image, 'gallery_slider'));
}
switch(get_field($id.'_slider_choice')){
    case 'Slider':
        $fieldId = $id."_slider";

        $sliderPage = get_field($fieldId);
        $post = get_post( $sliderPage );
        if(is_numeric($sliderPage) && $sliderPage > 0){
            $fg = new FooGallery_Template_Loader();
            $gallery = $fg->find_gallery(array('id' => $sliderPage));
            $images = array();

            foreach ($gallery->attachments() as $attach) {
                if($current > $numberOfImages){
                    break;
                }
                $current++;
                $img =  wp_get_attachment_image_src($attach->ID, 'gallery_slider');
                $images[] = $img[0];
            }
            $data['images'] = $images;
        }
        break;
    case 'Fotografija':
        $fieldId = $id."_fotografija";
        $image = get_field($fieldId);
        $data['images'] = array(get_image_from_custom_field($image, 'gallery_slider'));
        break;
}



//dump($data['images']);
get_partial($template, array('data' => $data));

//FooGalleryAlbum::get_by_id( $id );
