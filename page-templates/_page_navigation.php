<?php
/**
 * Created by PhpStorm.
 * User: st00ne1
 * Date: 15/07/15
 * Time: 19:26
 */
?>
<span class="i-block">
    <span class="desc">
        <a href="" data-scroll-to="on" data-scroll-to-target=".scroll-<?php echo $data['id']; ?>">
            <h4><?php echo $data['naslov']; ?></h4>
        </a>
        <span class="text">
            <?php echo $data['opis']; ?>
        </span>
    </span>
    <a href="" data-scroll-to="on" data-scroll-to-target=".scroll-<?php echo $data['id']; ?>">
        <img src="<?php echo $data['ikona']; ?>" alt="Image"/>
    </a>
</span>