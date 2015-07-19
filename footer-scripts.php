<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 */
?>

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