<!--START SECTION-->
<section data-section class="section scroll-1" data-animation="on">

    <section class="green-line">
        <h3>
            Ostale galerije
        </h3>
    </section>

    <section class="gallery-list">

        <div class="header-bg home"></div>

        <div class="out-w">
            <div class="out">
                <div class="inn">
                    <div class="container-8">
                        <div class="col-8">
                            <figure>
                        <span class="itemblock-header-grid two">
                            <?php foreach ($section as $gallery) { ?>

                                <span class="i-block preview">
                                    <a href="<?php echo $gallery['images'][0]; ?>" data-lightbox="gallery-<?= $gallery['id']; ?>">
                                        <img src="<?php echo $gallery['images'][0]; ?>" alt="Image"/>
                                    </a>
                                    <span class="gallery-list">
                                        <?php
                                        unset($gallery['images'][0]);
                                        foreach($gallery['image'] as $img) { ?>
                                            <a href="<?php echo $img; ?>" data-lightbox="gallery-<?= $gallery['id']; ?>"></a>
                                        <?php } ?>

                                    </span>
                                    <span class="desc">
                                        <h4><?= $gallery['title']; ?></h4>
                                        <span class="text">
                                            <?= $gallery['description']; ?>
                                        </span>
                                    </span>
                                    <img class="icon" src="<?= bu('static/ui/magnifier.png'); ?>" alt="Image"/>

                                </span>
                            <?php } ?>

                        </span>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <a class="arrow-down" href="#" data-scroll-to="on" data-scroll-to-target=".scroll-5">
        <i></i>
    </a>
</section>
<!--END SECTION-->