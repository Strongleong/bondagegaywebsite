<?php

namespace Lib\Core;

class Config extends Bag
{
    private const CONFIG_PATHS = [
        '/configs',
        '/configs/global',
        '/configs/private',
    ];

    public function __construct(
        private string $name
    ) {
        parent::__construct();

        foreach (self::CONFIG_PATHS as $dir) {
            $filename = PROJECT_DIR .  "$dir/$name.php";

            if (file_exists($filename)) {
                $this->data = array_merge_recursive($this->data, require_once $filename);
            }
        }
    }
}
