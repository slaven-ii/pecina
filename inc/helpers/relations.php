<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 09/07/15
 * Time: 12:17
 */

class RoomsRelation {
    const APARTMENT_VILLA = 'apartment_to_villa';
    const ROOMS_HOTEL = 'room_to_hotel';

    public static function register_villas_apartment(){
        /**
         * Relation villa - apartment
         */
        function my_connection_villa() {
            p2p_register_connection_type( array(
                'name' => 'apartment_to_villa',
                'from' => 'apartment',
                'to' => 'villa'
            ) );
        }
        add_action( 'p2p_init', 'my_connection_villa' );
    }

    public static function register_hotel_rooms(){
        /**
         * Relation Hotel - rooms
         */
        function my_connection_hotel() {
            p2p_register_connection_type( array(
                'name' => 'room_to_hotel',
                'from' => 'hotel',
                'to' => 'room'
            ) );
        }
        add_action( 'p2p_init', 'my_connection_hotel' );
    }

    public static function get_relations($type){
        global $post;

        // Find connected pages
        $connected = new WP_Query( array(
            'connected_type' => $type,
            'connected_items' => $post,
            'nopaging' => true,
        ) );
        $rooms = array();
        // Display connected pages
        if ( $connected->have_posts() ) {
            while ($connected->have_posts()) : $connected->the_post();

                $roomData = array(
                    'people' => get_field('number_of_people'),
                    'title' => get_the_title(),
                    'content' => get_rendered_content(),
                    'price' => get_field('price_text'),
                    'book' => get_field('book_now_code'),
                    'images' => get_images_from_custom_field_gallery(get_field('slider'), 'preview'),
                );
                $rooms[] = $roomData;
            endwhile;

            // Prevent weirdness
            wp_reset_postdata();
            wp_reset_query();

        }
        return $rooms;

    }

}

RoomsRelation::register_hotel_rooms();
RoomsRelation::register_villas_apartment();



