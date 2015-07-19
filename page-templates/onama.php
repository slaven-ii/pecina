<?php
/**
 * Template Name: O nama
 *
 */

get_header();
the_post();
?>
    <!--START HEADER-->
    <header class="work-header">

        <div class="header-bg home"></div>


        <div class="out">
            <div class="inn">
                <div class="container-8">
                    <div class="col-8">
                        <h1><?php the_title(); ?></h1>
                        <figure>
                        <span class="itemblock-header-grid two">
                            <?php
                            get_partial('navigationHandler');
                            ?>

                        </span>
                        </figure>
                    </div>
                </div>
            </div>
        </div>

        <div class="header-box">
            <span>Radno vrijeme:</span>
            <div class="home-box-inner">
                <span class="label">pon-pet:</span>
                <span class="val">8h - 18h</span>
                <span class="label">sub:</span>
                <span class="val">8h - 15h</span>
            </div>
        </div>

        <a class="arrow-down" href="#" data-scroll-to="on" data-scroll-to-target=".scroll-1">
            <i></i>
        </a>

    </header>
    <!--END HEADER-->

<?php for($i = 1; $i<=4; $i++){
    $id = $i;
    $next = $id + 1;
    if($i == 2){
        get_partial('sectionHandler', array('id' => $id, 'next' => $next, 'special' => 'tree'));

    }elseif($i==3){
        get_partial('sectionHandler', array('id' => $id, 'next' => $next, 'special' => 'multi'));

    }else{
        get_partial('sectionHandler', array('id' => $id, 'next' => $next));

    }

} ?>

<?php

get_footer();