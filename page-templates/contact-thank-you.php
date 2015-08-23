<?php
/**
 * Template Name: Contact Thank you
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
                        <img src="<?= bu('static/ui/img-1-1.jpg'); ?>" alt="" width="1920" height="500">
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
                    <article class="thank-you">
                        <h4>Hvala</h4>
                        <p>
                            <?php _e('Vaš e-mail je uspješno poslan!', 'pecina'); ?> <br/>
                            <?php _e('Cijenimo što nas kontaktirate i', 'pecina'); ?> <br/>
                            <?php _e('uskoro ćemo Vam odgovoriti.', 'pecina'); ?>
                        </p>

                        <a class="green-btn" href="/">
                            pecina.hr
                        </a>
                    </article>
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
