<?php
/**
 * Created by PhpStorm.
 * User: Vilim Stubičan
 * Date: 21.6.2015.
 * Time: 11:28
 */

class AutoLoader {

    private $files = array(
        "global" => "global",
        "custom-post-types" => "custom-post-types",
//        "custom-fields" => "custom-fields",
        "ShortcodeLoader" => "shortcodes/ShortcodeLoader",
        "partials" => "helpers/partials",
        "images" => "helpers/images",
        "relations" => "helpers/relations",
        "UpdateChecker" => "theme-update-checker",
        "plugin-dependency" => "plugin-dependency",
        "shortcodes" => "shortcodes",
     );


    public function loadFiles()
    {
        foreach($this->files as $fileName => $filePath) {
            if(file_exists(INCLUDE_PATH . $filePath . ".php")) {
                require_once INCLUDE_PATH . $filePath . ".php";
            }
        }
    }

}

$autoLoader = new AutoLoader();
$autoLoader->loadFiles();