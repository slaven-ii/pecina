<?php
/**
 * Template Name: Contact
 *
 */

get_header();
the_post();
?>
<!--START SECTION-->
<section class="slider-wrapper">
    <div class="extra-slider">
        <div class="wrapper">
            <ul>
                <li>
                    <img src="<?= bu('static/ui/img-1-1-contact.jpg'); ?>" alt="" width="1920" height="500">
                </li>
            </ul>
        </div>
    </div>
</section>
<!--END SECTION-->

<!--END MAIN-->

<!--START FOOTER-->
<footer class="footer scroll-4" data-animation="on">

    <section class="contact-wrapper">

        <div class="container-12">

            <div class="col-12">
                <h4 class="form-title">
Tu smo za Vas.
                </h4>
            </div>

            <div class="col-2 c-item">
                <article class="info">
                    <span class="green">Vrtlarija Pecina</span> <br/>
                    +385 1 3842 892 <br/>
                    <span class="green">Jaroslav Pecina</span> <br/>
                    +385 98 450 666 <br/>
                    <span class="green">Jan Pecina</span> <br/>
                    +385 98 1658 387

            <ul class="social">
                        <li>
                            <a href="#" class="fb">
                                <img src="<?= bu('static/ui/svg/fb.svg'); ?>" alt="Facebook"/>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="hr">
                                <img src="<?= bu('static/ui/svg/hr.svg'); ?>" alt="Hrvatski"/>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="en">
                                <img src="<?= bu('static/ui/svg/en.svg'); ?>" alt="Engleski"/>
                            </a>
                        </li>
                    </ul>
                </article>
            </div>

            <div class="col-5 c-item">
                <div id="simple-map-canvas" rel="45.8041251|15.7977075" data-img="<?= bu('static/ui/pecina_pin_google.png'); ?>"></div>
            </div>

            <div class="col-5 c-item">
                <?php the_content(); ?>
            </div>

</div>

</section>


<section class="copy">
    <div class="container-12">
        <div class="col-12">
            &copy; 2015. Pecina d.o.o. All rights reserved.

            <a class="arrow-up" href="#" data-scroll-to="on" data-scroll-to-target="body">
                <i></i>
            </a>
        </div>
    </div>
</section>
</footer>
<!--END FOOTER-->
<?php
get_footer('scripts');
