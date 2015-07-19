<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( get_bloginfo('name') .' | ', true, 'left' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src='<?php echo bu('static/js/vendor/modernizr/modernizr.js'); ?>' async="async"></script>

    <!-- Page styles -->
    <link rel="stylesheet" href="<?php echo bu('static/css/compress.css?r=1'); ?>" />

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-62156779-1', 'auto');
    ga('send', 'pageview');

</script>
<div id="cd-nav" class="cd-nav">
    <div class="cd-navigation-wrapper">
        <div class="cd-half-block">
            <h2>Izbornik</h2>
            <nav>
                <ul class="cd-primary-nav">
                    <?php wp_nav_menu( array( 'theme_location' => 'header-menu','walker' => new Walker_Menu_Clean() ,'container' => '', 'container_class' => false, 'menu_class' =>'cd-primary-nav' ) ); ?>

            </nav>
        </div><!-- .cd-half-block -->

    </div> <!-- .cd-navigation-wrapper -->
</div> <!-- .cd-nav -->

<a href="#cd-nav" class="cd-nav-trigger">Menu
    <span class="cd-nav-icon"></span>

    <svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54">
        <circle fill="transparent" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
    </svg>
</a>


<!--START NAV-->
<nav class="main-nav">

    <div class="container-24">
        <div class="col-24">

            <?php wp_nav_menu( array( 'theme_location' => 'header-menu','walker' => new Walker_Menu() ,'container' => '', 'container_class' => false, ) ); ?>


        </div>
    </div>

    <?php
    $showSecondNavigation = array(
        'page.php',
        'page-templates/onama.php'
    );
    if(( strpos(get_page_template(), 'page.php') !== false || strpos(get_page_template(), 'page-templates/onama.php') !== false ) && !is_front_page()){ ?>
        <div class="subnav">
            <div class="container-12">
                <div class="col-12">
                    <?php get_partial('subMenuHandler')?>

                </div>
            </div>
        </div>
    <?php } ?>

</nav>
<!--END NAV-->

<style>
    .hand-written{
        font-family: 'architects_daughterregular';
    }
</style>

