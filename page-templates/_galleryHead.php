
<!--START HEADER-->
<header class="work-header">

    <div class="header-bg home"></div>

    <div class="out">
        <div class="inn">
            <div class="container-8">
                <div class="col-8">
                    <h1></h1>
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