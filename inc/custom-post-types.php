<?php
/**
 * Created by PhpStorm.
 * User: Vilim Stubičan
 * Date: 21.6.2015.
 * Time: 11:46
 */


/**
 *  Template function for adding custom post type. AutoLoader class should auto include this file.
 */

/*
function create_villa_post_type() {
    register_post_type( 'villa',
        array(
            'labels' => array(
                'name' => __( 'Villas' ),
                'singular_name' => __( 'Villa' )
            ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'public' => true,
            'has_archive' => true,
            'hierarchical' => false,
            'rewrite' => array('slug' => 'villa', 'with_front' => true),
            'show_in_nav_menus' => true,
        )
    );
}
add_action( 'init', 'create_villa_post_type' );

function create_apartment_post_type() {
    register_post_type( 'apartment',
        array(
            'labels' => array(
                'name' => __( 'Villas Apartments' ),
                'singular_name' => __( 'Villa Apartment' )
            ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'public'             => true,
            'publicly_queryable' => false,
            'has_archive' => true,
            'hierarchical' => false,
            'rewrite' => array('slug' => 'apartment', 'with_front' => true),
        )
    );
}
add_action( 'init', 'create_apartment_post_type' );

function create_hotel_post_type() {
    register_post_type( 'hotel',
        array(
            'labels' => array(
                'name' => __( 'Hotels' ),
                'singular_name' => __( 'Hotel' )
            ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'public' => true,
            'has_archive' => true,
            'hierarchical' => false,
            'show_in_nav_menus' => true,
            'rewrite' => array('slug' => 'hotel', 'with_front' => true),
        )
    );
}
add_action( 'init', 'create_hotel_post_type' );

function create_room_post_type() {
    register_post_type( 'room',
        array(
            'labels' => array(
                'name' => __( 'Hotel Rooms' ),
                'singular_name' => __( 'Hotel Room' )
            ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'public'             => true,
            'publicly_queryable' => false,
            'has_archive' => true,
            'hierarchical' => false,
            'rewrite' => array('slug' => 'room', 'with_front' => true),
        )
    );
}
add_action( 'init', 'create_room_post_type' );

function create_proizvod_post_type() {
    register_post_type( 'proizvod',
        array(
            'labels' => array(
                'name' => __( 'Proizvodi' ),
                'singular_name' => __( 'Proizvod' )
            ),
            'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'public'             => true,
            'publicly_queryable' => false,
            'has_archive' => true,
            'hierarchical' => false,
            'rewrite' => array('slug' => 'proizvodi', 'with_front' => true),
        )
    );
}
add_action( 'init', 'create_proizvod_post_type' );

*/
