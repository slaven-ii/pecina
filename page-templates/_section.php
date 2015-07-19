<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 14/07/15
 * Time: 17:45
 */
?>
<!--START SECTION-->
<section data-section class="section <?php echo ($data['special'])? 'auto-section':''; ?> scroll-<?= $data['id']; ?>" data-animation="on">
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
                        <h4 class="green"> <?= $data['lijeva_kolona_title']; ?></h4>
                        <span class="text">
                            <?= do_shortcode($data['lijeva_kolona_content']); ?>
                        </span>
                    </article>
                </div>
                <div class="col-4 one-col-text">
                    <article class="middle">
                        <h4 class="green">
                            <strong><?= $data['srednja_kolona_title']; ?></strong>
                        </h4>
                        <span class="text">
                            <?= do_shortcode($data['srednja_kolona_content']); ?>
                        </span>
                    </article>
                </div>
                <div class="col-4 one-col-text has-button">
                    <article class="right">
                        <h4 class="green">
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

    <?php if($data['special'] == 'tree'){
        get_partial('_tree');
    }else{ ?>
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
        <?php if($data['special'] == 'multi'){ ?>
        <div class="inner-cols">
            <div class="out">
                <div class="inn">
                    <div class="container-12">
                        <div class="col-12 itemblock-cols-wrapper three">
                            <div class="inner-col">
                                <figure>
                                    <img src="<?= bu('static/ui/about-5.jpg'); ?>" alt="Image"/>
                                </figure>
                                <span class="text">
                                    <?= $data['p_lijeva_sadrzaj']; ?>
                                </span>
                            </div>
                            <div class="inner-col">
                                <figure>
                                    <img src="<?= bu('static/ui/about-6.jpg'); ?>" alt="Image"/>
                                </figure>
                                <span class="text">
                                    <?= $data['p_srednja_sadrzaj']; ?>
                                </span>
                            </div>
                            <div class="inner-col">
                                <figure>
                                    <img src="<?= bu('static/ui/about-7.jpg'); ?>" alt="Image"/>
                                </figure>
                                <span class="text">
                                   <?= $data['p_desna_sadrzaj']; ?>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php } ?>
    </section>

    <?php } ?>
    <a class="arrow-down" href="#" data-scroll-to="on" data-scroll-to-target=".scroll-<?= $data['next']; ?>">
        <i></i>
    </a>
</section>
<!--END SECTION-->