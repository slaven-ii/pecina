<?php

add_theme_support( 'post-thumbnails' );
add_image_size( 'gallery_slider', 1920, 1000, true );
add_image_size( 'gallery_thumb', 315, 220, true );
add_image_size( 'gallery_full', 1333, 768, true );


define("INCLUDE_PATH", get_template_directory() . "/inc/");
define("TEMPLATE_PATH", get_template_directory() . "/");
define("INCLUDE_URL", get_template_directory_uri());

require get_template_directory() . "/inc/vendors/AutoLoader.php";

//Initialize the update checker.
$example_update_checker = new ThemeUpdateChecker(
    'pecina',                                            //Theme folder name, AKA "slug".
    'https://raw.githubusercontent.com/slaven-ii/pecina/master/manifest.json' //URL of the metadata file.
);

/**
 * Pretty dump
 * @param $obj
 */
function dump($obj) {
    echo "<pre class='debug'>";
    var_dump($obj);
    echo "</pre>";
}

/**
 * Base url convertion method.
 * @param $url
 * @return string
 */
function bu($url) {
    $clean = trim($url);
    return INCLUDE_URL . "/" .$clean;
}

function au($url) {
    $clean = trim($url);
    return get_template_directory() . "/" .$clean;
}


/**
 * MENU
 */
function register_my_menu() {
    register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );
function register_my_menus() {
    register_nav_menus(
        array(
            'header-menu' => __( 'Header Menu' ),
        )
    );
}
add_action( 'init', 'register_my_menus' );

/**
 * helper for getting options field from acf
 * @param $field
 * @return bool|mixed|null|void
 */
function  get_field_option($field){
    return get_field($field, 'options');
}

/**
 * Disable archive of the hotel
 */
/* Register template redirect action callback */
add_action('template_redirect', 'meks_remove_wp_archives');

/* Remove archives */
function meks_remove_wp_archives(){
    //If we are on category or tag or date or author archive
    if( is_category() || is_tag() || is_date() || is_author() || is_post_type_archive('hotel')) {
        global $wp_query;
        $wp_query->set_404(); //set to 404 not found page
    }
}

function get_rendered_content(){
    ob_start();
    the_content();
    $content = ob_get_clean();
    return $content;
}



function getDataURI($image, $wordpress = true, $mime = '') {
    $cacheKey = sha1($image);
    $dataUri = wp_cache_get($cacheKey);

    if($dataUri){
        return $dataUri;
    }

    if($wordpress){
        $uploads = wp_upload_dir();
        $image_path = str_replace( $uploads['baseurl'], $uploads['basedir'], $image );
        $dataUri = 'data:'.(function_exists('mime_content_type') ? trim(mime_content_type($image_path)) : trim($mime)).';base64,'.base64_encode(file_get_contents($image_path));

    }else{
        $dataUri = 'data:'.(function_exists('mime_content_type') ? trim(mime_content_type($image)) : trim($mime)).';base64,'.base64_encode(file_get_contents($image));

    }

    wp_cache_set( $cacheKey, $dataUri );

    return $dataUri;

}

function renderLanguageHeader() {
    //TODO: please refactor with get_partial
    global $sitepress;
    $activeLanguages = $sitepress->get_ls_languages();
    $listItems = '';
    $activeLanguageCode = '';
    //var_dump($activeLanguages); die();
    foreach ($activeLanguages as $activeLang) {
        if ($activeLang['active'] == '1') {
            $activeLanguageCode = 'active';
            //continue; //we dont want the active lang here
        }
        $img = " <img src=".bu('static/ui/svg/'.$activeLang['language_code'].'.svg') ." alt=".$activeLang['language_code']."/>";
        $listItems .= sprintf('<li class="%s"><a href="%s" class="%s">%s</a></li>', $activeLanguageCode, $activeLang['url'], $activeLang['language_code'], $img);
    }
    $output = sprintf('<ul class="social">%s</ul>', $listItems);
    echo $output;
}


class Walker_Menu extends Walker_Nav_Menu {

    private static $counter = 0;
    /**
     * At the start of each element, output a <li> and <a> tag structure.
     *
     * Note: Menu objects include url and title properties, so we will use those.
     */
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        //$counter = $this->get_number_of_root_elements();
        self::$counter++;
        if(self::$counter >= 6){
            return;
        }

        $output .= sprintf( "\n<li><a href='%s'%s>%s</a></li>\n",
            $item->url,
            ( $item->object_id == get_the_ID() ) ? ' class="active"' : '',
            $item->title
        );
        if(self::$counter == 3){
            $output .='<li class="logo">
                        <a href="/">
                            <img width="114" height="28" src="'. bu('static/ui/svg/logo.svg') .'" alt=""/>
                        </a>
                    </li>';
        }

        if(self::$counter == 5){
            $output .='<li><a class="" href="#" data-scroll-to="on" data-scroll-to-target=".footer">Kontakt</a></li>';
        }



    }


}

class Walker_Menu_Clean extends Walker_Nav_Menu {

    private static $counter = 0;
    /**
     * At the start of each element, output a <li> and <a> tag structure.
     *
     * Note: Menu objects include url and title properties, so we will use those.
     */
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        //$counter = $this->get_number_of_root_elements();
        self::$counter++;
        if(self::$counter >= 6){
            return;
        }

        $output .= sprintf( "\n<li><a href='%s'%s>%s</a></li>\n",
            $item->url,
            ( $item->object_id == get_the_ID() ) ? ' class="active"' : '',
            $item->title
        );

        /*
        if(self::$counter == 5){
            $output .='<li><a class="" href="#" data-scroll-to="on" data-scroll-to-target=".footer">Kontakt</a></li>';
        }
        */



    }


}

/**
 * I included this section in case you do a copy paste you don't have to worry
 * about setting up a stylesheet
 *
 *  function js_shortcode_css()
{
wp_register_style('js-shortcode-css',
plugins_url( '/style.css', __FILE__ ),
false,
'1.0',
false );
wp_enqueue_style('js-shortcode-css');
}
//Make sure the style sheet is only loaded in the backend
add_action( 'admin_head', 'js_shortcode_css' );
 */

//Need to find what the base of the page you currently are on
if(!defined("JS_CURRENT_PAGE"))
    define("JS_CURRENT_PAGE", basename($_SERVER['PHP_SELF']));

//If the current page is a page or a post load the popup to be run in the admin footer
if(in_array(JS_CURRENT_PAGE, array('post.php', 'page.php', 'page-new.php', 'post-new.php'))){
    //THe third argument is set to 11 so the button appears after the WordPress Add Media button
    add_action('media_buttons', 'add_js_shortcode_button', 11);
    add_action('admin_footer',  'add_js_shortcode_popup');

}

//Function for creating the button
function add_js_shortcode_button()
{
    //Check to see if the current page is contained in the array
    $is_post_edit_page = in_array(JS_CURRENT_PAGE, array('post.php', 'page.php', 'page-new.php', 'post-new.php'));
    if($is_post_edit_page)
    {
        //Use the wordpress thick box to display the popup
        //More info can be found here https://codex.wordpress.org/ThickBox
        echo '<a href="#TB_inline?width=480&inlineId=select_js_shortcode" class="thickbox"
            id="add_js_shortcode" title="' . __("Dodaj gumb", 'js_shortcode') . '"><button type="button">Dodaj gumb</button></a>';

    }
}

//Button for the popup with two forms for example
function add_js_shortcode_popup()
{
    ?>
    <script>
        jQuery(document).ready(function() {
            //Hide the forms until one is selected
            jQuery('[data-form]').hide();

            //Name of the select that you will be watching for a change
            jQuery("#add_js_short").change(function() {
                jQuery('[data-form]').hide();
                var selected = jQuery(this).val();
                jQuery('[data-form="' + selected +'"]').show();

            });
        });

        //This is run once a user clicks the submit button
        function InsertShortcode(){
            var form_shortcode = jQuery("#add_js_short").val();
            if(form_shortcode == ""){
                alert("<?php _e("Odaberi gumb", "js_shortcode") ?>");
                return;
            }
            var inputs = jQuery('[data-form="' + form_shortcode +'"] input');
            var inputData = ' ';
            inputs.each(function(){
                var current = jQuery(this);
                inputData += current.attr('name') + '="' + current.val() + '" ';
            });

            //Send the shortcode to the editor with the built shortcode
            window.send_to_editor("[" + form_shortcode  + inputData + "][/" + form_shortcode +"]");

            /*
            if(form_shortcode == "button_to_link") {
                var js_link_href = jQuery("#form_href").val();
                var js_link_display = !js_link_href ? "" : " href=\"" + js_link_href + "\"";
                var js_title = jQuery("#form_title").val();
                var js_title_display = !js_title ? "" : " title=\"" + js_title + "\"";

                var js_class = jQuery("#form_class").val();
                var js_class_display = !js_class ? "" : " class=\"" + js_class + "\"";
                var js_style = jQuery("#form_style").val();
                var js_style_display = !js_style ? "" : " style=\"" + js_style + "\"";

                var js_rel = jQuery("#form_rel").val();
                var js_rel_display = !js_rel ? "" : " rel=\"" + js_rel + "\"";
                var js_form_id = jQuery("#form_id").val();
                var js_form_id_display = !js_form_id ? "" : " id=\"" + js_form_id + "\"";

                var js_form_content = jQuery("#form_content").val();
                var js_form_content_display = !js_form_content ? "contact form" : js_form_content;

                //Send the shortcode to the editor with the built shortcode
                window.send_to_editor("[" + form_shortcode + js_link_display + js_title_display + js_class_display
                + js_style_display + js_rel_display + js_form_id_display +"]" + js_form_content
                + "[/contact]");
            }
            else if(form_shortcode == "button")
            {
                var js_button_href = jQuery("#button_href").val();
                var js_button_href_display = !js_button_href ? " href=\"#" : " href=\"" + js_button_href + "\"";
                var js_button_title = jQuery("#button_title").val();
                var js_button_title_display = !js_button_title ? "" : " title=\"" + js_button_title + "\"";

                var js_button_class = jQuery("#button_class").val();
                var js_button_class_display = !js_button_class ? "" : " class=\"" + js_button_class + "\"";
                var js_button_style = jQuery("#button_style").val();
                var js_button_style_display = !js_button_style ? "" : " style=\"" + js_button_style + "\"";

                var js_button_rel = jQuery("#button_rel").val();
                var js_button_rel_display = !js_button_rel ? " rel=\"nofollow\"" : " rel=\"" + js_button_class + "\"";
                var js_button_id = jQuery("#button_id").val();
                var js_button_id_display = !js_button_id ? "" : " id=\"" + js_button_id + "\"";

                var js_button_content = jQuery("#button_content").val();
                var js_button_content_display = !js_button_content ? "Button Text" : js_button_content;
                //Send the shortcode to the editor with the built shortcode
                window.send_to_editor("[button" + js_button_class_display + js_button_href_display
                + js_button_title_display + js_button_style_display + js_button_rel_display
                + js_button_id_display +"]" + js_button_content_display + "[/button]");

            }

            else {
                window.send_to_editor("[" + form_shortcode + "]");
            }
             */
        }
    </script>

    <div id="select_js_shortcode" style="display:none;">
        <div class="js_shortcode_form_display">
            <h3 id="js_shortcode_header"><?php _e("Dodaj gumb", "js_shortcode"); ?></h3>
            <span>
                <?php _e("Odaberite gumb iz izbornika kako bi ga dodali u sadržaj", "js_shortcode"); ?>
            </span>
        </div>
        <div class="js_shortcode_form_display">
            <select name="add_js_short" id="add_js_short">
                <option value="">--</option>
                <option value="button_to_link">Gumb Link</option>
                <option value="button_download">Gumb Download</option>
                <option value="button_gallery_link">Gumb za automatsko otvaranje galerije</option>
                <option value="button_to_footer">Gumb za automatski scroll na kontakt</option>
                <option value="button_mail">Gumb za email</option>
            </select>
        </div>
        <div class="js_shortcode_form_display" data-form="button_to_link">
            <div class="js_shortcode_form">
                <label for="form_content" class="js_contact_label">Naslov gumba:</label>
                <input type="text" name="naslov" /><br>

                <label for="form_href" class="js_contact_label">Url:</label>
                <input type="text" name="link" /><br>

            </div>
        </div>
        <div class="js_shortcode_form_display" data-form="button_download">
            <div class="js_shortcode_form">
                <label for="form_content" class="js_contact_label">Naslov gumba:</label>
                <input type="text" name="naslov" /><br>

                <label for="form_href" class="js_contact_label">Url:</label>
                <input type="text" name="link" /><br>

            </div>
        </div>
        <div class="js_shortcode_form_display" data-form="button_gallery_link">
            <div class="js_shortcode_form">
                <label for="form_content" class="js_contact_label">Naslov gumba:</label>
                <input type="text" name="naslov" /><br>

                <label for="form_href" class="js_contact_label">Id galerije (pogledaj u listu FooGallery):</label>
                <input type="text" name="id" /><br>

            </div>
        </div>
        <div class="js_shortcode_form_display" data-form="button_to_footer">
            <div class="js_shortcode_form">
                <label for="form_content" class="js_contact_label">Naslov gumba:</label>
                <input type="text" name="naslov" /><br>

            </div>
        </div>
        <div class="js_shortcode_form_display" data-form="button_mail">
            <div class="js_shortcode_form">
                <label for="form_content" class="js_contact_label">Naslov gumba:</label>
                <input type="text" name="naslov" /><br>
                <label for="form_content" class="js_contact_label">Email:</label>
                <input type="text" name="mail" /><br>

            </div>
        </div>

        <div style="padding:15px;">
            <input type="button" class="button-primary" value="Dodaj gumb" onclick="InsertShortcode();"/>&nbsp;&nbsp;&nbsp;
            <a class="button" style="color:#bbb;" href="#" onclick="tb_remove(); return false;"><?php _e("Cancel", "js_shortcode"); ?></a>
        </div>
    </div>

<?php
}
