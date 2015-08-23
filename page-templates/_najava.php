<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 15/07/15
 * Time: 17:55
 */

?>
<!--START SECTION-->
<section data-section class="section scroll-1" data-animation="on">
    <section class="green-line">
        <h3>
            <?= $data['naslov']; ?>
        </h3>
    </section>

    <section class="three-col-text">
        <div class="container-12">
            <div class="col-12">
                <div class="col-4 one-col-text has-button">
                    <article class="left">
                        <h4 class="orange" style="color: dimgrey; font-weight: 600;"><?= $data['lijeva_kolona_title']; ?></h4>
                        <span class="text">
                            <?= do_shortcode($data['lijeva_kolona_content']); ?>
                        </span>
                    </article>
                </div>
                <div class="col-4 one-col-text">
                    <article class="middle">
                        <h4 class="orange" >
                            <?= $data['srednja_kolona_title']; ?>
                        </h4>
                        <span class="text">
                            <?= do_shortcode($data['srednja_kolona_content']); ?>
                        </span>
                    </article>
                </div>
                <div class="col-4 one-col-text has-button">
                    <article class="right">
                        <h4 class="orange" style="color: dimgrey; font-weight: 600;">
                            <?= $data['desna_kolona_title']; ?>
                        </h4>
                        <span class="text">
                            <?= do_shortcode($data['desna_kolona']); ?>
                        </span>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <section class="slider-wrapper">
        <div class="extra-slider <?php echo (count($data['images']) > 1)? 'is-slider' : ''; ?> ">
            <div class="wrapper">
                <ul>
                    <?php foreach ($data['images'] as $image) { ?>
                        <li>
                            <img src="<?= $image; ?>" alt="" >
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </section>

    <div class="fb-box">
        <span class="icons-wrapper">
            <span class="fb-icon">
                <img src="<?php echo bu('static/ui/svg/fb-icon.svg'); ?>" alt="Facebook"/>
            </span>
            <span class="like-icon">
                <img src="<?php echo bu('static/ui/svg/like-icon.svg'); ?>" alt="Facebook"/>
            </span>
        </span>

        <span class="box-title">
            Lajkajte nas <br/>
            i pratite naše <br/>
            objave na <br/>
            Facebooku
        </span>

        <span class="text">
            .. jer možda baš Vi dobijete poklon - besplatnu trajnicu po izboru!
        </span>
    </div>

    <a class="arrow-down" href="#" data-scroll-to="on" data-scroll-to-target=".scroll-2">
        <i></i>
    </a>
</section>
<!--END SECTION-->