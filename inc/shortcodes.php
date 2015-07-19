<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 18/07/15
 * Time: 13:14
 */

function add_deg_gallery_button( $atts, $content ){
    $params = shortcode_atts( array(
        'id' => '',
        'naslov' => '',
    ), $atts );
    if(empty($params['id'])){
        return;
    }

    $pages = get_posts(array(
        'post_type' => 'page',
        'meta_key' => '_wp_page_template',
        'meta_value' => 'page-templates/pecina-gallery.php'
    ));
    $galleryPermalink = false;
    foreach($pages as $page){
        $galleryPermalink =  get_permalink($page->ID);
        break;
    }

    if(!$galleryPermalink){
        return false;
    }

    $galleryLink = $galleryPermalink . '#gallery-'.$params['id'];
    ob_start();
    ?>
    <a class="btn classic" style="width: inherit;" href="<?= $galleryLink; ?>"><?= $params['naslov']; ?></a>

    <?php
    $data = ob_get_clean();
    return $data;
}
add_shortcode( 'button_gallery_link', 'add_deg_gallery_button' );


function add_deg_to_footer( $atts, $content ){
    $params = shortcode_atts( array(
        'naslov' => '',
    ), $atts );


    ob_start();
    ?>
    <a class="btn classic" data-scroll-to="on" data-scroll-to-target=".footer" href="#"><?= $params['naslov']; ?></a>

    <?php
    $data = ob_get_clean();
    return $data;
}
add_shortcode( 'button_to_footer', 'add_deg_to_footer' );

function add_deg_to_link( $atts, $content ){
    $params = shortcode_atts( array(
        'naslov' => '',
        'link' => ''
    ), $atts );


    ob_start();
    ?>
    <a class="btn classic" href="<?= $params['link']; ?>"><?= $params['naslov']; ?></a>

    <?php
    $data = ob_get_clean();
    return $data;
}
add_shortcode( 'button_to_link', 'add_deg_to_link' );

function add_deg_btn_mail( $atts, $content ){
    $params = shortcode_atts( array(
        'naslov' => '',
        'mail' => ''
    ), $atts );


    ob_start();
    ?>
    <a class="btn classic"  href="mailTo:<?= $params['mail']; ?>"><?= $params['naslov']; ?></a>

    <?php
    $data = ob_get_clean();
    return $data;
}
add_shortcode( 'button_mail', 'add_deg_btn_mail' );

function add_deg_button_download( $atts, $content ){
    $params = shortcode_atts( array(
        'naslov' => '',
        'link' => ''
    ), $atts );


    ob_start();
    ?>
    <a class="btn classic" target="_blank" href="<?= $params['link']; ?>"><?= $params['naslov']; ?>
        <img style="width: 20px; top: 5px; position: relative;" src="<?= bu('static/ui/pecina_download_icon_2.png'); ?>">
    </a>


    <?php
    $data = ob_get_clean();
    return $data;
}
add_shortcode( 'button_download', 'add_deg_button_download' );
