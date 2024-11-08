<?php

namespace Lib\Core;

class Bag
{
    private array $cache = [];

    public function __construct(
        protected array $data = []
    ) {
    }

    public function get(string $key, mixed $default = null): mixed
    {
        if (key_exists($key, $this->cache)) {
            return $this->cache[$key];
        }

        $path = explode('.', $key);

        if (count($path) === 1) {
            return  key_exists($key, $this->data) ? $this->data[$key] : $default;
        }

        $data = &$this->data;
        $res = $default;

        foreach ($path as $p) {
            if (!array_key_exists($p, $data)) {
                break;
            }

            if (is_array($data[$p])) {
                $data = &$data[$p];
                continue;
            }

            $res = $data[$p];
        }

        $this->cache[$key] = $res;
        return $res;
    }

    public function set(string $key, mixed $value): void
    {
        $path = explode('.', $key);
        $pathCount = count($path);

        if ($pathCount === 1) {
            $this->data[$key] = $value;
            return;
        }

        $data = &$this->data;

        foreach ($path as $p) {
            $data[$p] = [];
            $data = &$data[$p];
        }

        $data = $value;
        unset($this->cache[$key]);
    }
}
