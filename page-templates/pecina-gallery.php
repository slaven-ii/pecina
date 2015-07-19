<?php
/**
 * Template Name: Galerija pecina
 *
 */

get_header();
the_post();

$type = 'foogallery';
$args = array(
    'post_type' => $type,
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => 'id',
    'order'   => 'ASC',

);

$my_query = null;
$my_query = new WP_Query($args);
$sections = array();
if( $my_query->have_posts() ) {
    while ($my_query->have_posts()) : $my_query->the_post();

        $data['title'] = get_the_title();

        $data['description'] = get_field('opis');
        $data['images'] = array();
        $data['id'] = get_the_ID();
        $fg = new FooGallery_Template_Loader();
        $gallery = $fg->find_gallery(array('id' => get_the_ID()));
        $images = array();
        foreach ($gallery->attachments() as $attach) {
            $img =  wp_get_attachment_image_src($attach->ID, 'gallery_full');
            $images[] = $img[0];
        }
        $data['images'] = $images;
        $sections[] = $data;


    endwhile;
}
wp_reset_query();

$sections = array_chunk($sections, 4, true);

?>


<?php
$counter = 1;
foreach ($sections as $section) {
    if($counter == 1 ){
        get_partial('_galleryHead', array('section' => $section));
    }else{
        get_partial('_gallerySection', array('section' => $section));

    }
    $counter++;
}
get_footer();
