<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 */
?>

<!--START FOOTER-->
<footer class="footer scroll-4" data-animation="on">
    <section class="green-line">
        <h3>
            <?php _e('Kontakt', 'pecina'); ?>
        </h3>
    </section>

    <section class="three-col-text" style="padding-bottom: 10px;">
        <div class="container-12">
            <div class="col-12">
                <div class="col-4 one-col-text">
                    <article class="left">
                        <h4 class="green"><?php _e('kako do nas?', 'pecina'); ?></h4>
                        <span class="text">
                            <?php _e('- autoput Zagreb - Ljubljana (E 70; A3)', 'pecina'); ?> <br/>
                            <?php _e('- izlaz Sv. Nedelja na prvom semaforu skrenite desno (stara Samoborska)', 'pecina'); ?> <br/>
                            <?php _e('- nakon 900 m stižete u Vrtlariju Pecina', 'pecina'); ?>
                        </span>
                    </article>
                </div>
                <div class="col-4 one-col-text">
                    <article class="middle">
                        <h4 class="green">
                            <strong><?php _e('kontakt', 'pecina'); ?></strong>
                        </h4>
                        <span class="text">
                            <?php _e('+385 1 3842 892', 'pecina'); ?> <br/>
                            <span class="green"><?php _e('Jaroslav Pecina, dipl.ing.agr. –  hortikultura', 'pecina'); ?></span> <br/>
                            <?php _e('+385 98 450 666', 'pecina'); ?> <br/>
                            <span class="green"><?php _e('Jan Pecina, mag.ing.agr. – zaštita bilja', 'pecina'); ?></span> <br/>
                            <?php _e('+385 98 1658 387', 'pecina'); ?> <br/>
                            <!-- <a href="mailto:info@pecina.hr">info@pecina.hr</a> -->
                        </span>
                        <a class="btn classic" style="margin-bottom: 15px;" href="/upit" target="_blank">upit</a>
                    </article>
                </div>
                <div class="col-4 one-col-text has-button">
                    <article class="right">
                        <h4 class="green">
                            <?php _e('ADRESA', 'pecina'); ?>
                        </h4>
                        <span class="text">
                            Vrtarija Pecina<br/>
                            Franje Tuđmana 20, Novaki <br>
                            10431 Sveta Nedelja <br>
                            <br>
                            <span class="green">OIB:</span> 87526088885
                            <br>
                            <span class="green">IBAN:</span> HR4923600001101276572
                        </span>
                    </article>
                </div>
            </div>
        </div>
    </section>


    <section class="map-wrapper">
        <div class="container-12">
            <div class="col-12">
                <div class="map-inner">
                    <!--
                    <div class="address">
                        <h4>Adresa</h4>
                    <span class="text">
                        Franje Tuđmana 20, <br/>
                        Novaki <br/>
                        10431 Sv. Nedelja
                        <br/>
                        <span class="green">OIB:</span> 87526088885
                        <br>
                        <span class="green">IBAN:</span> HR4923600001101276572
                    </span>
                    -->
                </div>
                <div id="simple-map-canvas" rel="45.8041251|15.7977075" data-img="<?= bu('static/ui/pecina_pin_google.png'); ?>" ></div>
            </div>
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
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<script src="//maps.googleapis.com/maps/api/js?&sensor=false"></script>
<script src='<?php echo bu('static/js/frontend.min.js'); ?>' defer></script>

<script src='<?php echo bu('static/js/compress.js'); ?>' defer></script>
<script defer>
    $("img").each(function(){
        $(this).css("background-image", $(this).attr("src"));
    });
</script>

	<?php wp_footer(); ?>
</body>
</html>