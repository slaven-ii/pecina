<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header('404'); ?>


    <main class="error">
        <div class="out-w">
            <div class="out">
                <div class="inn">
                    <div class="container-12">
                        <div class="col-12">
                            <header>
                                <a class="error-logo" href="/">
                                    <img src="<?= bu('static/ui/svg/logo.png'); ?>" alt="Pecina"/>
                                </a>
                            </header>
                        </div>
                        <div class="col-12">
                            <div class="col-6">
                                <figure>
                                    <img src="<?= bu('static/ui/404.png'); ?>" alt="404"/>
                                </figure>
                            </div>
                            <div class="col-6 right-text">
                                <div class="out-w">
                                    <div class="out">
                                        <div class="inn">
                                            <article>
                                                <h1>
                                                    404 error
                                                <span>
                                                 page not found
                                                </span>
                                                </h1>

                                                <p class="strong">
                                                    Pričekajte trenutak ... <br/>
                                                    za to vrijeme provjerite - Je li Vaše cvijeće zaliveno? <br/>
                                                    <br/>
                                                </p>
                                                <p>
                                                    Please wait ... <br/>
                                                    in the meantime - Check if your flowers are watered!
                                                </p>

                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

<?php
get_footer();
